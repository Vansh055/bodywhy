package com.bodywhy.web;

import com.bodywhy.content.port.ContentQueryPort;
import com.bodywhy.progress.port.ProgressPort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/nodes")
class NodeController {
    private final ContentQueryPort content;
    private final ProgressPort progress;

    NodeController(ContentQueryPort content, ProgressPort progress) {
        this.content = content;
        this.progress = progress;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNode(@PathVariable UUID id, @AuthenticationPrincipal UUID userId) {
        return content.getApprovedNode(id)
                .map(node -> {
                    if (userId != null) progress.recordNodeView(userId, id);
                    return ResponseEntity.ok(node);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/related")
    public ResponseEntity<?> getRelated(@PathVariable UUID id) {
        return ResponseEntity.ok(content.getRelatedConcepts(id));
    }
}