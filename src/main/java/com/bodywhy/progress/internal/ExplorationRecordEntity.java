package com.bodywhy.progress.internal;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "exploration_records", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "node_id"}))
class ExplorationRecordEntity {
    @Id private UUID id;
    @Column(name = "user_id") private UUID userId;
    @Column(name = "node_id") private UUID nodeId;
    @Column(name = "first_viewed_at") private Instant firstViewedAt = Instant.now();
    @Column(name = "last_viewed_at") private Instant lastViewedAt = Instant.now();

    protected ExplorationRecordEntity() {}
    ExplorationRecordEntity(UUID id, UUID userId, UUID nodeId) {
        this.id = id; this.userId = userId; this.nodeId = nodeId;
    }
    void touch() { this.lastViewedAt = Instant.now(); }
    UUID getUserId() { return userId; }
}