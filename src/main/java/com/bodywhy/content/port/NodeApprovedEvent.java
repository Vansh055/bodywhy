package com.bodywhy.content.port;

import java.util.UUID;

/**
 * Published when a node is approved. content publishes this without knowing
 * or caring who listens — it has zero outbound dependency on aiorchestration.
 * aiorchestration depends on content.port (the allowed direction) to listen for it.
 */
public record NodeApprovedEvent(UUID nodeId) {}