package com.bodywhy.aiorchestration.internal;

import com.bodywhy.aiorchestration.port.TutorPort;
import com.bodywhy.aiorchestration.port.TutorResponse;
import com.bodywhy.progress.port.AuditPort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
class TutorService implements TutorPort {

    private static final Logger log = LoggerFactory.getLogger(TutorService.class);

    private static final double GROUNDING_THRESHOLD = 0.60;

    private final VectorStore vectorStore;
    private final ChatClient chatClient;
    private final AuditPort audit;

    TutorService(VectorStore vectorStore,
                 ChatClient.Builder chatClientBuilder,
                 AuditPort audit) {
        this.vectorStore = vectorStore;
        this.chatClient = chatClientBuilder.build();
        this.audit = audit;
    }

    @Override
    public TutorResponse answerFollowUp(UUID userId, String question) {

        // ================= DEBUG (NO THRESHOLD) =================
        log.info("=================================================");
        log.info("Tutor Question: {}", question);

        var debugMatches = vectorStore.similaritySearch(
                SearchRequest.builder()
                        .query(question)
                        .topK(4)
                        .build() // NO similarity threshold
        );

        if (debugMatches == null || debugMatches.isEmpty()) {
            log.info("DEBUG: No matches returned even without threshold.");
        } else {
            log.info("DEBUG: {} match(es) found without threshold.", debugMatches.size());

            debugMatches.forEach(match -> {
                log.info("-------------------------------------------");
                log.info("Score    : {}", match.getScore());
                log.info("Metadata : {}", match.getMetadata());
                log.info("Text     : {}", match.getText());
            });
        }

        log.info("=================================================");
        // =========================================================

        // Actual retrieval with threshold
        var matches = debugMatches;

        if (matches.isEmpty()) {
            var fallback = new TutorResponse(
                    "We don't have reviewed material on that yet.",
                    List.of(),
                    false
            );

            audit.recordAiInteraction(
                    userId,
                    question,
                    fallback.answerText(),
                    List.of(),
                    false
            );

            return fallback;
        }

        String context = matches.stream()
                .map(d -> d.getText())
                .collect(Collectors.joining("\n\n"));

        List<UUID> nodeIds = matches.stream()
                .map(d -> UUID.fromString((String) d.getMetadata().get("nodeId")))
                .distinct()
                .toList();

        String answer = chatClient.prompt()
                .system("""
                        Answer ONLY using the provided context.
                        If the context doesn't fully answer the question,
                        say so plainly instead of guessing.
                        Never introduce a claim not present in the context.
                        """)
                .user(u -> u.text("""
                        Context:
                        {context}

                        Question:
                        {question}
                        """)
                        .param("context", context)
                        .param("question", question))
                .call()
                .content();

        var response = new TutorResponse(answer, nodeIds, true);

        audit.recordAiInteraction(
                userId,
                question,
                answer,
                nodeIds,
                true
        );

        return response;
    }
}