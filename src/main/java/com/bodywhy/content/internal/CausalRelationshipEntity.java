package com.bodywhy.content.internal;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "causal_relationships")
public class CausalRelationshipEntity {

    @Id
    private UUID id;

    @Column(name = "source_node_id")
    private UUID sourceNodeId;

    @Column(name = "target_node_id")
    private UUID targetNodeId;

    @Enumerated(EnumType.STRING)
    @Column(name = "relationship_type")
    private RelationshipType relationshipType;

    @Enumerated(EnumType.STRING)
    private EvidenceStrength strength;

    @Enumerated(EnumType.STRING)
    @Column(name = "review_status")
    private ReviewStatus reviewStatus = ReviewStatus.DRAFT;

    @Column(name = "reviewed_by")
    private UUID reviewedBy;

    @Column(name = "reviewed_at")
    private Instant reviewedAt;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @Version
    private int version;

    protected CausalRelationshipEntity() {
        // JPA
    }

    public CausalRelationshipEntity(UUID id, UUID sourceNodeId, UUID targetNodeId,
                                    RelationshipType type, EvidenceStrength strength) {
        if (sourceNodeId.equals(targetNodeId)) {
            throw new IllegalArgumentException("An edge cannot connect a node to itself");
        }
        this.id = id;
        this.sourceNodeId = sourceNodeId;
        this.targetNodeId = targetNodeId;
        this.relationshipType = type;
        this.strength = strength;
    }

    /**
     * Approval requires both endpoint nodes to already be approved — enforced by
     * the calling service (ContentAuthoringService), since checking that requires
     * loading two OTHER aggregates, which this entity must not do itself.
     */
    public void approve(UUID reviewerId) {
        this.reviewStatus = ReviewStatus.APPROVED;
        this.reviewedBy = reviewerId;
        this.reviewedAt = Instant.now();
    }

    public UUID getId() { return id; }
    public UUID getSourceNodeId() { return sourceNodeId; }
    public UUID getTargetNodeId() { return targetNodeId; }
    public RelationshipType getRelationshipType() { return relationshipType; }
    public EvidenceStrength getStrength() { return strength; }
    public ReviewStatus getReviewStatus() { return reviewStatus; }
}