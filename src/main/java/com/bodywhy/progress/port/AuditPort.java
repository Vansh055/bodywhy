package com.bodywhy.progress.port;

import java.util.List;
import java.util.UUID;
public interface AuditPort {
    void recordAiInteraction(UUID userId, String question, String answerText,
                             List<UUID> citedNodeIds, boolean grounded);
}