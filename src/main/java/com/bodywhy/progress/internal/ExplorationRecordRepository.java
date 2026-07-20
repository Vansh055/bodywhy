package com.bodywhy.progress.internal;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

interface ExplorationRecordRepository extends JpaRepository<ExplorationRecordEntity, UUID> {
    Optional<ExplorationRecordEntity> findByUserIdAndNodeId(UUID userId, UUID nodeId);
    long countByUserId(UUID userId);
}