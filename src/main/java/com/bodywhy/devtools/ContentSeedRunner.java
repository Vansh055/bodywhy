package com.bodywhy.devtools;

import com.bodywhy.content.port.ContentAuthoringPort;
import com.bodywhy.content.port.ContentQueryPort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Authors and approves the Hall of Fame mechanism:
 *
 * Sleep -> Cortisol -> Sleep
 *
 * using ONLY ContentQueryPort / ContentAuthoringPort.
 *
 * Gated to the "seed" profile so it never runs in local or production
 * unless explicitly requested.
 *
 * Run with:
 * mvn spring-boot:run -Dspring-boot.run.profiles=local,seed
 */
@Component
@Profile("seed")
class ContentSeedRunner implements CommandLineRunner {

    private static final Logger log =
            LoggerFactory.getLogger(ContentSeedRunner.class);

    // Placeholder reviewer ID until the identity module exists.
    private static final UUID PLACEHOLDER_REVIEWER_ID =
            UUID.fromString("00000000-0000-0000-0000-000000000001");

    private final ContentAuthoringPort authoring;
    private final ContentQueryPort query;

    ContentSeedRunner(
            ContentAuthoringPort authoring,
            ContentQueryPort query
    ) {
        this.authoring = authoring;
        this.query = query;
    }

    @Override
    public void run(String... args) {

        log.info(
                "Seeding Hall of Fame mechanism: Sleep -> Cortisol -> Sleep"
        );

        // ============================================================
        // 1. CREATE / GET NODES
        // ============================================================

        UUID sleepId =
                authoring.draftNode("PROCESS", "Sleep");

        UUID cortisolId =
                authoring.draftNode("PROCESS", "Cortisol");

        log.info("Sleep node ID: {}", sleepId);
        log.info("Cortisol node ID: {}", cortisolId);


        // ============================================================
        // 2. SLEEP NODE
        // ============================================================

        authoring.updateHook(
                sleepId,
                "You didn't sleep. You're not even that tired. "
                        + "But by 3pm you'd fight someone for the last donut."
        );

        authoring.updateTension(
                sleepId,
                "You may think the craving is simply a lack of willpower. "
                        + "But the chain starts much earlier — with your body "
                        + "responding to sleep loss."
        );

        authoring.updateMechanism(
                sleepId,
                """
                [
                  "To your brain, a bad night's sleep doesn't look like tiredness. It looks like danger.",
                  "So it sounds the alarm: cortisol, the hormone built for real threats.",
                  "Cortisol wants fast fuel, so it floods your blood with sugar.",
                  "It also quiets the signal that says you've had enough.",
                  "More sugar, a weaker 'I'm full' signal - that's the craving."
                ]
                """,
                "You're not craving a donut. Your body just ran its emergency "
                        + "fuel plan - the same one it uses for physical danger - "
                        + "because it can't tell 'no sleep' from 'no safety'.",
                "That same alarm state makes it harder to fall asleep tonight - "
                        + "which is how one bad night quietly becomes a bad week.",
                cortisolId
        );

        authoring.updateDepth(
                sleepId,
                "Sleep restriction is classified as a genuine physiological stressor; "
                        + "HPA-axis activity and circulating cortisol are elevated following "
                        + "both partial and total sleep deprivation. The specific cognitive "
                        + "'threat detection' framing is a simplifying teaching metaphor, "
                        + "not a literal claim — see Hall of Fame review notes."
        );

        authoring.updateTakeaway(
                sleepId,
                "A bad night's sleep can change the signals that influence hunger and craving. "
                        + "Understanding the mechanism makes the craving easier to understand, "
                        + "rather than treating it as a failure of willpower."
        );


        // ============================================================
        // 3. CORTISOL NODE
        // ============================================================

        authoring.updateHook(
                cortisolId,
                "Cortisol is the hormone your body reaches for first "
                        + "when something needs to happen fast."
        );

        authoring.updateTension(
                cortisolId,
                "You might think cortisol is simply a stress hormone. "
                        + "But what matters is what that signal tells the rest "
                        + "of your body to do."
        );

        authoring.updateMechanism(
                cortisolId,
                """
                [
                  "When your body detects a stressor, the HPA axis increases cortisol production.",
                  "Cortisol helps make energy available quickly by influencing glucose metabolism.",
                  "That extra available energy helps the body respond to immediate demands.",
                  "But when the stress signal stays elevated, the same system can affect appetite, sleep, and other body processes.",
                  "So a system designed for short-term demands can become part of a longer cycle when the stress signal keeps returning."
                ]
                """,
                "Cortisol isn't simply 'the stress hormone.' "
                        + "It's part of a system designed to help your body respond "
                        + "when something demands a rapid response.",
                "When that alarm state keeps returning, it can become part of the "
                        + "same loop that makes another poor night of sleep more likely.",
                sleepId
        );

        authoring.updateDepth(
                cortisolId,
                "Cortisol is a glucocorticoid produced by the adrenal cortex, "
                        + "central to the HPA axis stress response, with wide-ranging "
                        + "effects on glucose metabolism, immune function, and appetite regulation."
        );

        authoring.updateTakeaway(
                cortisolId,
                "Cortisol is useful when your body needs to respond quickly. "
                        + "The problem is not cortisol itself, but what can happen "
                        + "when the stress system keeps being activated."
        );


        // ============================================================
        // 4. APPROVE NODES
        // ============================================================

        authoring.approveNode(
                sleepId,
                PLACEHOLDER_REVIEWER_ID
        );

        authoring.approveNode(
                cortisolId,
                PLACEHOLDER_REVIEWER_ID
        );


        // ============================================================
        // 5. CREATE SLEEP -> CORTISOL EDGE
        // ============================================================

        UUID sleepToCortisolEdge =
                authoring.draftEdge(
                        sleepId,
                        cortisolId,
                        "INFLUENCES",
                        "WELL_ESTABLISHED"
                );

        authoring.approveEdge(
                sleepToCortisolEdge,
                PLACEHOLDER_REVIEWER_ID
        );


        // ============================================================
        // 6. VERIFY SLEEP
        // ============================================================

        log.info(
                "Seeded and approved. Verifying Sleep via ContentQueryPort..."
        );

        query.getApprovedNode(sleepId).ifPresentOrElse(
                node -> log.info(
                        "SUCCESS: Sleep node approved and retrievable: \"{}\"",
                        node.hookText()
                ),
                () -> log.error(
                        "FAILED: Sleep node not retrievable after approval"
                )
        );


        // ============================================================
        // 7. VERIFY CORTISOL
        // ============================================================

        log.info(
                "Verifying Cortisol via ContentQueryPort..."
        );

        query.getApprovedNode(cortisolId).ifPresentOrElse(
                node -> log.info(
                        "SUCCESS: Cortisol node approved and retrievable: \"{}\"",
                        node.hookText()
                ),
                () -> log.error(
                        "FAILED: Cortisol node not retrievable after approval"
                )
        );


        // ============================================================
        // 8. VERIFY SLEEP RELATED CONCEPTS
        // ============================================================

        var sleepRelated =
                query.getRelatedConcepts(sleepId);

        log.info(
                "Sleep's related concepts ({}): {}",
                sleepRelated.size(),
                sleepRelated.stream()
                        .map(n -> n.title())
                        .toList()
        );

        if (sleepRelated.isEmpty()) {

            log.error(
                    "FAILED: expected Cortisol to appear as a related concept"
            );

        } else {

            log.info(
                    "SUCCESS: Sleep -> Cortisol relationship verified."
            );
        }


        // ============================================================
        // 9. VERIFY CORTISOL RELATED CONCEPTS
        // ============================================================

        var cortisolRelated =
                query.getRelatedConcepts(cortisolId);

        log.info(
                "Cortisol's related concepts ({}): {}",
                cortisolRelated.size(),
                cortisolRelated.stream()
                        .map(n -> n.title())
                        .toList()
        );


        // ============================================================
        // 10. FINAL RESULT
        // ============================================================

        log.info(
                "============================================================"
        );

        log.info(
                "BODYWHY HALL OF FAME MECHANISM SEEDED SUCCESSFULLY"
        );

        log.info(
                "Sleep -> Cortisol -> Sleep"
        );

        log.info(
                "============================================================"
        );
    }
}