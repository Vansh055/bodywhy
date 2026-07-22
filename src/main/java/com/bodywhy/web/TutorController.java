package com.bodywhy.web;

import com.bodywhy.aiorchestration.port.TutorPort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

record QuestionRequest(String question) {}

@RestController
@RequestMapping("/api/tutor")
class TutorController {
    private final TutorPort tutor;
    TutorController(TutorPort tutor) { this.tutor = tutor; }

    @PostMapping("/ask")
    public Object ask(@RequestBody QuestionRequest req, @AuthenticationPrincipal UUID userId) {
        return tutor.answerFollowUp(userId, req.question());
    }
}