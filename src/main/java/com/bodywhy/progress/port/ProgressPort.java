package com.bodywhy.progress.port;

import java.util.UUID;
public interface ProgressPort {
    void recordNodeView(UUID userId, UUID nodeId);
    ExplorationSummary getExplorationSummary(UUID userId);
}