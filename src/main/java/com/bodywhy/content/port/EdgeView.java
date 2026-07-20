package com.bodywhy.content.port;

import java.util.UUID;

public record EdgeView(
        UUID id,
        UUID sourceNodeId,
        UUID targetNodeId,
        String relationshipType,
        String strength
) {}
