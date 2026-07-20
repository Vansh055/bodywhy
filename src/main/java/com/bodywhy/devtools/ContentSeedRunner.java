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
 * Authors and approves the Hall of Fame mechanism (Sleep -> Cortisol -> Craving)
 * end to end, using ONLY ContentQueryPort/ContentAuthoringPort — never touching
 * content.internal directly. This is both a seed script and a live proof that
 * the module boundary actually works.
 *
 * Gated to the "seed" profile so it never runs in local or production by accident.
 * Run with: mvn spring-boot:run -Dspring-boot.run.profiles=local,seed
 */
@Component
@Profile("seed")
class ContentSeedRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(ContentSeedRunner.class);

    // Placeholder reviewer ID until the identity module exists (Milestone 7+).
    // Real reviewer identity will come from an authenticated UUID once auth is wired in.
    private static final UUID PLACEHOLDER_REVIEWER_ID =
            UUID.fromString("00000000-0000-0000-0000-000000000001");

    private final ContentAuthoringPort authoring;
    private final ContentQueryPort query;

    ContentSeedRunner(ContentAuthoringPort authoring, ContentQueryPort query) {
        this.authoring = authoring;
        this.query = query;
    }

    @Override
    public void run(String... args) {
        log.info("Seeding Hall of Fame mechanism: Sleep -> Cortisol -> Craving");

        UUID sleepId = authoring.draftNode("PROCESS", "Sleep");
        UUID cortisolId = authoring.draftNode("PROCESS", "Cortisol");

        authoring.updateHook(sleepId,
                "You didn't sleep. You're not even that tired. But by 3pm you'd fight someone for the last donut.");
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
                "You're not craving a donut. Your body just ran its emergency fuel plan - the same one it uses "
                        + "for physical danger - because it can't tell 'no sleep' from 'no safety'.",
                "That same alarm state makes it harder to fall asleep tonight - which is how one bad night "
                        + "quietly becomes a bad week.",
                cortisolId
        );
        authoring.updateDepth(sleepId,
                "Sleep restriction is classified as a genuine physiological stressor; HPA-axis activity and "
                        + "circulating cortisol are elevated following both partial and total sleep deprivation. "
                        + "The specific cognitive 'threat detection' framing is a simplifying teaching metaphor, "
                        + "not a literal claim — see Hall of Fame review notes.");

        authoring.updateHook(cortisolId,
                "Cortisol is the hormone your body reaches for first when something needs to happen fast.");
        authoring.updateDepth(cortisolId,
                "Cortisol is a glucocorticoid produced by the adrenal cortex, central to the HPA axis stress "
                        + "response, with wide-ranging effects on glucose metabolism, immune function, and appetite regulation.");

        authoring.approveNode(sleepId, PLACEHOLDER_REVIEWER_ID);
        authoring.approveNode(cortisolId, PLACEHOLDER_REVIEWER_ID);

        UUID edgeId = authoring.draftEdge(sleepId, cortisolId, "INFLUENCES", "WELL_ESTABLISHED");
        authoring.approveEdge(edgeId, PLACEHOLDER_REVIEWER_ID);

        log.info("Seeded and approved. Verifying via ContentQueryPort...");

        query.getApprovedNode(sleepId).ifPresentOrElse(
                node -> log.info("Sleep node approved and retrievable: \"{}\"", node.hookText()),
                () -> log.error("FAILED: Sleep node not retrievable after approval")
        );

        var related = query.getRelatedConcepts(sleepId);
        log.info("Sleep's related concepts ({}): {}", related.size(),
                related.stream().map(n -> n.title()).toList());

        if (related.isEmpty()) {
            log.error("FAILED: expected Cortisol to appear as a related concept");
        } else {
            log.info("SUCCESS: content module proven end-to-end.");
        }
    }
}