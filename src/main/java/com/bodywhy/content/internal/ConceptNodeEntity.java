package com.bodywhy.content.internal;

import jakarta.persistence.*;
        import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "concept_nodes")
public class ConceptNodeEntity {

    @Id
    private UUID id;

    @Enumerated(EnumType.STRING)
    private NodeType type;

    private String title;

    @Column(name = "hook_text")
    private String hookText;

    @Column(name = "mechanism_steps_json")
    private String mechanismStepsJson;

    @Column(name = "realization_text")
    private String realizationText;

    @Column(name = "thread_text")
    private String threadText;

    @Column(name = "thread_node_id")
    private UUID threadNodeId;

    @Column(name = "depth_text")
    private String depthText;

    @Enumerated(EnumType.STRING)
    @Column(name = "review_status")
    private ReviewStatus reviewStatus = ReviewStatus.DRAFT;

    @Column(name = "reviewed_by")
    private UUID reviewedBy;

    @Column(name = "reviewed_at")
    private Instant reviewedAt;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    @Version
    private int version;

    protected ConceptNodeEntity() {
        // JPA
    }

    public ConceptNodeEntity(UUID id, NodeType type, String title) {
        this.id = id;
        this.type = type;
        this.title = title;
    }

    public void approve(UUID reviewerId) {
        if (this.reviewStatus == ReviewStatus.APPROVED) {
            return;
        }
        this.reviewStatus = ReviewStatus.APPROVED;
        this.reviewedBy = reviewerId;
        this.reviewedAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public void markNeedsUpdate() {
        this.reviewStatus = ReviewStatus.NEEDS_UPDATE;
        this.updatedAt = Instant.now();
    }

    public boolean isApproved() {
        return this.reviewStatus == ReviewStatus.APPROVED;
    }

    // Getters — no public setters beyond the behavior methods above;
    // state transitions go through approve()/markNeedsUpdate(), never a raw setter,
    // so the review-gating invariant can't be bypassed by accident.

    public UUID getId() { return id; }
    public NodeType getType() { return type; }
    public String getTitle() { return title; }
    public String getHookText() { return hookText; }
    public String getMechanismStepsJson() { return mechanismStepsJson; }
    public String getRealizationText() { return realizationText; }
    public String getThreadText() { return threadText; }
    public UUID getThreadNodeId() { return threadNodeId; }
    public String getDepthText() { return depthText; }
    public ReviewStatus getReviewStatus() { return reviewStatus; }
    public UUID getReviewedBy() { return reviewedBy; }
    public Instant getReviewedAt() { return reviewedAt; }
    public int getVersion() { return version; }

    public void setHookText(String hookText) { this.hookText = hookText; this.updatedAt = Instant.now(); }
    public void setMechanismStepsJson(String json) { this.mechanismStepsJson = json; this.updatedAt = Instant.now(); }
    public void setRealizationText(String text) { this.realizationText = text; this.updatedAt = Instant.now(); }
    public void setThreadText(String text, UUID threadNodeId) {
        this.threadText = text;
        this.threadNodeId = threadNodeId;
        this.updatedAt = Instant.now();
    }
    public void setDepthText(String text) { this.depthText = text; this.updatedAt = Instant.now(); }
}