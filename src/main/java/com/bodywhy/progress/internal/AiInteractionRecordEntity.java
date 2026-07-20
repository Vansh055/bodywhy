package com.bodywhy.progress.internal;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "ai_interaction_records")
class AiInteractionRecordEntity {
    @Id private UUID id;
    @Column(name = "user_id") private UUID userId;
    @Column(columnDefinition = "TEXT") private String question;
    @Column(name = "answer_text", columnDefinition = "TEXT") private String answerText;
    @ElementCollection
    @CollectionTable(name = "ai_interaction_cited_nodes", joinColumns = @JoinColumn(name = "interaction_id"))
    @Column(name = "node_id")
    private List<UUID> citedNodeIds;
    @Column(name = "grounded") private boolean grounded;
    @Column(name = "occurred_at") private Instant occurredAt = Instant.now();

    protected AiInteractionRecordEntity() {}
    AiInteractionRecordEntity(UUID id, UUID userId, String question, String answerText,
                              List<UUID> citedNodeIds, boolean grounded) {
        this.id = id; this.userId = userId; this.question = question;
        this.answerText = answerText; this.citedNodeIds = citedNodeIds; this.grounded = grounded;
    }
}