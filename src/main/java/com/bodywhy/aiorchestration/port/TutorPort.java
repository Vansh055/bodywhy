package com.bodywhy.aiorchestration.port;

import java.util.UUID;

public interface TutorPort {
    TutorResponse answerFollowUp(UUID userId, String question);
}