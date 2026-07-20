package com.bodywhy.progress.internal;

import com.bodywhy.progress.port.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
class ProgressService implements ProgressPort, AuditPort {
    private final ExplorationRecordRepository explorationRepo;
    private final AiInteractionRecordRepository auditRepo;

    ProgressService(ExplorationRecordRepository explorationRepo, AiInteractionRecordRepository auditRepo) {
        this.explorationRepo = explorationRepo;
        this.auditRepo = auditRepo;
    }

    @Override
    @Transactional
    public void recordNodeView(UUID userId, UUID nodeId) {
        explorationRepo.findByUserIdAndNodeId(userId, nodeId)
                .ifPresentOrElse(
                        ExplorationRecordEntity::touch,
                        () -> explorationRepo.save(new ExplorationRecordEntity(UUID.randomUUID(), userId, nodeId))
                );
    }

    @Override
    public ExplorationSummary getExplorationSummary(UUID userId) {
        return new ExplorationSummary(explorationRepo.countByUserId(userId));
    }

    @Override
    @Transactional
    public void recordAiInteraction(UUID userId, String question, String answerText,
                                    List<UUID> citedNodeIds, boolean grounded) {
        // Insert-only — no findById/update path exists anywhere in this class.
        auditRepo.save(new AiInteractionRecordEntity(
                UUID.randomUUID(), userId, question, answerText, citedNodeIds, grounded));
    }
}