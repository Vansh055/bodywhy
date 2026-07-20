package com.bodywhy.content.port;

import java.util.UUID;

public interface ContentAuthoringPort {

    UUID draftNode(String type, String title);

    void updateHook(UUID nodeId, String hookText);

    void updateMechanism(UUID nodeId, String mechanismStepsJson, String realizationText,
                         String threadText, UUID threadNodeId);

    void updateDepth(UUID nodeId, String depthText);

    void approveNode(UUID nodeId, UUID reviewerId);

    UUID draftEdge(UUID sourceNodeId, UUID targetNodeId, String relationshipType, String strength);

    void approveEdge(UUID edgeId, UUID reviewerId);
}