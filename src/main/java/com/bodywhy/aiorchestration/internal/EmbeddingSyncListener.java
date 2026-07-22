package com.bodywhy.aiorchestration.internal;

import com.bodywhy.content.port.ConceptNodeView;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
class EmbeddingSyncService {
    private final VectorStore vectorStore;

    EmbeddingSyncService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    void syncApprovedNode(ConceptNodeView node) {
        String text = String.join(". ",
                node.title(), node.hookText() == null ? "" : node.hookText(),
                node.realizationText() == null ? "" : node.realizationText(),
                node.depthText() == null ? "" : node.depthText());

        var doc = new Document(text, Map.of("nodeId", node.id().toString(), "title", node.title()));
        vectorStore.add(List.of(doc));
    }
}