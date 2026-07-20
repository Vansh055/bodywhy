package com.bodywhy.content.port;

import java.time.Instant;
import java.util.UUID;

public record ConceptNodeView(
        UUID id,
        String type,
        String title,
        String hookText,
        String mechanismStepsJson,
        String realizationText,
        String threadText,
        UUID threadNodeId,
        String depthText,
        boolean reviewed,
        Instant reviewedAt
) {}