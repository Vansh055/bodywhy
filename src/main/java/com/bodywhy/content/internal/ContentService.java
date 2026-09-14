package com.bodywhy.content.internal;

import com.bodywhy.content.port.ConceptNodeView;
import com.bodywhy.content.port.ContentAuthoringPort;
import com.bodywhy.content.port.ContentQueryPort;
import com.bodywhy.content.port.NodeApprovedEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
class ContentService implements ContentQueryPort, ContentAuthoringPort {

    private final ConceptNodeRepository nodeRepository;
    private final CausalRelationshipRepository edgeRepository;
    private final ApplicationEventPublisher events;

    ContentService(ConceptNodeRepository nodeRepository,
                   CausalRelationshipRepository edgeRepository,
                   ApplicationEventPublisher events) {
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
        this.events = events;
    }

    // ---- ContentQueryPort ----

    @Override
    public Optional<ConceptNodeView> getApprovedNode(UUID id) {
        return nodeRepository.findById(id)
                .filter(ConceptNodeEntity::isApproved)
                .map(this::toView);
    }

    @Override
    public List<ConceptNodeView> getRelatedConcepts(UUID id) {
        return edgeRepository.findLiveEdgesTouching(id).stream()
                .map(edge -> edge.getSourceNodeId().equals(id)
                        ? edge.getTargetNodeId()
                        : edge.getSourceNodeId())
                .distinct()
                .map(nodeRepository::findById)
                .flatMap(Optional::stream)
                .filter(ConceptNodeEntity::isApproved)
                .map(this::toView)
                .collect(Collectors.toList());
    }

    @Override
    public List<ConceptNodeView> findRelevantApprovedContent(
            String naturalLanguageQuery, int limit) {

        // Placeholder until Milestone 6 wires in real embedding-based retrieval.
        throw new UnsupportedOperationException(
                "findRelevantApprovedContent requires the embedding pipeline from Milestone 6"
        );
    }

    // ---- ContentAuthoringPort ----

    @Override
    @Transactional
    public UUID draftNode(String type, String title) {

        NodeType nodeType = NodeType.valueOf(type);

        return nodeRepository.findByTypeAndTitle(nodeType, title)
                .map(ConceptNodeEntity::getId)
                .orElseGet(() -> {
                    var entity = new ConceptNodeEntity(
                            UUID.randomUUID(),
                            nodeType,
                            title
                    );

                    nodeRepository.save(entity);
                    return entity.getId();
                });
    }

    @Override
    @Transactional
    public void updateHook(UUID nodeId, String hookText) {
        requireNode(nodeId).setHookText(hookText);
    }

    @Override
    @Transactional
    public void updateMechanism(
            UUID nodeId,
            String mechanismStepsJson,
            String realizationText,
            String threadText,
            UUID threadNodeId) {

        var node = requireNode(nodeId);

        node.setMechanismStepsJson(mechanismStepsJson);
        node.setRealizationText(realizationText);
        node.setThreadText(threadText, threadNodeId);
    }

    @Override
    @Transactional
    public void updateDepth(UUID nodeId, String depthText) {
        requireNode(nodeId).setDepthText(depthText);
    }

    @Override
    @Transactional
    public void updateTension(UUID nodeId, String tensionText) {
        requireNode(nodeId).setTensionText(tensionText);
    }

    @Override
    @Transactional
    public void updateTakeaway(UUID nodeId, String takeawayText) {
        requireNode(nodeId).setTakeawayText(takeawayText);
    }

    @Override
    @Transactional
    public void approveNode(UUID nodeId, UUID reviewerId) {
        requireNode(nodeId).approve(reviewerId);
        events.publishEvent(new NodeApprovedEvent(nodeId));
    }

    @Override
    @Transactional
    public UUID draftEdge(
            UUID sourceNodeId,
            UUID targetNodeId,
            String relationshipType,
            String strength) {

        var entity = new CausalRelationshipEntity(
                UUID.randomUUID(),
                sourceNodeId,
                targetNodeId,
                RelationshipType.valueOf(relationshipType),
                EvidenceStrength.valueOf(strength)
        );

        edgeRepository.save(entity);
        return entity.getId();
    }

    @Override
    @Transactional
    public void approveEdge(UUID edgeId, UUID reviewerId) {

        var edge = edgeRepository.findById(edgeId)
                .orElseThrow(() ->
                        new IllegalArgumentException("No such edge: " + edgeId));

        boolean sourceApproved =
                nodeRepository.findById(edge.getSourceNodeId())
                        .map(ConceptNodeEntity::isApproved)
                        .orElse(false);

        boolean targetApproved =
                nodeRepository.findById(edge.getTargetNodeId())
                        .map(ConceptNodeEntity::isApproved)
                        .orElse(false);

        if (!sourceApproved || !targetApproved) {
            throw new IllegalStateException(
                    "Cannot approve edge " + edgeId +
                            ": both endpoint nodes must be approved first"
            );
        }

        edge.approve(reviewerId);
    }

    // ---- helpers ----

    private ConceptNodeEntity requireNode(UUID id) {
        return nodeRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("No such node: " + id));
    }

    private ConceptNodeView toView(ConceptNodeEntity e) {
        return new ConceptNodeView(
                e.getId(),
                e.getType().name(),
                e.getTitle(),
                e.getHookText(),
                e.getMechanismStepsJson(),
                e.getRealizationText(),
                e.getThreadText(),
                e.getThreadNodeId(),
                e.getDepthText(),
                e.getTensionText(),
                e.getTakeawayText(),
                e.isApproved(),
                e.getReviewedAt()
        );
    }
}