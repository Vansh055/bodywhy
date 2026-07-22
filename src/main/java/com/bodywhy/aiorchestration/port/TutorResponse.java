package com.bodywhy.aiorchestration.port;

import java.util.List;
import java.util.UUID;

public record TutorResponse(String answerText, List<UUID> citedNodeIds, boolean groundedInApprovedContent) {}