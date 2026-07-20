package com.bodywhy.content.internal;

import com.bodywhy.content.port.ConceptNodeView;
import com.bodywhy.content.port.ContentAuthoringPort;
import com.bodywhy.content.port.ContentQueryPort;
import com.bodywhy.content.port.EdgeView;
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

    ContentService(ConceptNodeRepository nodeRepository, CausalRelationshipRepository edgeRepository) {
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
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
                .map(edge -> edge.getSourceNodeId().equals(id) ? edge.getTargetNodeId() : edge.getSourceNodeId())
                .distinct()
                .map(nodeRepository::findById)
                .flatMap(Optional::stream)
                .filter(ConceptNodeEntity::isApproved)
                .map(this::toView)
                .collect(Collectors.toList());
    }

    @Override
    public List<ConceptNodeView> findRelevantApprovedContent(String naturalLanguageQuery, int limit) {
        // Placeholder until Milestone 6 wires in real embedding-based retrieval.
        // Deliberately NOT implemented as a naive LIKE-based text search that could
        // silently ship as "good enough" — returning empty is more honest than a
        // fake relevance signal, and keeps this method's contract truthful until
        // the real implementation lands.
        throw new UnsupportedOperationException(
                "findRelevantApprovedContent requires the embedding pipeline from Milestone 6"
        );
    }

    // ---- ContentAuthoringPort ----

    @Override
    @Transactional
    public UUID draftNode(String type, String title) {
        var entity = new ConceptNodeEntity(UUID.randomUUID(), NodeType.valueOf(type), title);
        nodeRepository.save(entity);
        return entity.getId();
    }

    @Override
    @Transactional
    public void updateHook(UUID nodeId, String hookText) {
        var node = requireNode(nodeId);
        node.setHookText(hookText);
    }

    @Override
    @Transactional
    public void updateMechanism(UUID nodeId, String mechanismStepsJson, String realizationText,
                                String threadText, UUID threadNodeId) {
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
    public void approveNode(UUID nodeId, UUID reviewerId) {
        requireNode(nodeId).approve(reviewerId);
    }

    @Override
    @Transactional
    public UUID draftEdge(UUID sourceNodeId, UUID targetNodeId, String relationshipType, String strength) {
        var entity = new CausalRelationshipEntity(
                UUID.randomUUID(), sourceNodeId, targetNodeId,
                RelationshipType.valueOf(relationshipType), EvidenceStrength.valueOf(strength)
        );
        edgeRepository.save(entity);
        return entity.getId();
    }

    @Override
    @Transactional
    public void approveEdge(UUID edgeId, UUID reviewerId) {
        var edge = edgeRepository.findById(edgeId)
                .orElseThrow(() -> new IllegalArgumentException("No such edge: " + edgeId));

        // The cross-aggregate invariant from Workflow 2: an edge cannot approve
        // unless BOTH endpoint nodes are already approved. This is a read-check
        // against two other aggregates, not a nested transaction across them —
        // exactly the pattern validated during the workflow trace.
        boolean sourceApproved = nodeRepository.findById(edge.getSourceNodeId())
                .map(ConceptNodeEntity::isApproved).orElse(false);
        boolean targetApproved = nodeRepository.findById(edge.getTargetNodeId())
                .map(ConceptNodeEntity::isApproved).orElse(false);

        if (!sourceApproved || !targetApproved) {
            throw new IllegalStateException(
                    "Cannot approve edge " + edgeId + ": both endpoint nodes must be approved first"
            );
        }
        edge.approve(reviewerId);
    }

    // ---- helpers ----

    private ConceptNodeEntity requireNode(UUID id) {
        return nodeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No such node: " + id));
    }

    private ConceptNodeView toView(ConceptNodeEntity e) {
        return new ConceptNodeView(
                e.getId(), e.getType().name(), e.getTitle(),
                e.getHookText(), e.getMechanismStepsJson(), e.getRealizationText(),
                e.getThreadText(), e.getThreadNodeId(), e.getDepthText(),
                e.isApproved(), e.getReviewedAt()
        );
    }
}