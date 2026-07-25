package com.bodywhy.aiorchestration.internal;

import com.bodywhy.content.port.ContentQueryPort;
import com.bodywhy.content.port.NodeApprovedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.List;
import java.util.Map;

@Component
class EmbeddingSyncService {

    private static final Logger log = LoggerFactory.getLogger(EmbeddingSyncService.class);

    private final VectorStore vectorStore;
    private final ContentQueryPort content;

    EmbeddingSyncService(VectorStore vectorStore, ContentQueryPort content) {
        this.vectorStore = vectorStore;
        this.content = content;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onNodeApproved(NodeApprovedEvent event) {
        content.getApprovedNode(event.nodeId()).ifPresentOrElse(
                node -> {
                    String text = String.join(". ",
                            node.title(),
                            safe(node.hookText()), safe(node.realizationText()), safe(node.depthText()));

                    var doc = new Document(text, Map.of(
                            "nodeId", node.id().toString(), "title", node.title()));
                    vectorStore.add(List.of(doc));
                    log.info("Embedded and stored node '{}' ({})", node.title(), node.id());
                },
                () -> log.warn("NodeApprovedEvent fired for {} but node isn't approved-retrievable", event.nodeId())
        );
    }

    private static String safe(String s) { return s == null ? "" : s; }
}