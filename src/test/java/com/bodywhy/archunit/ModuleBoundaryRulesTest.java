package com.bodywhy.archunit;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.lang.ArchRule;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

/**
 * Enforces the module dependency rules from the frozen backend architecture.
 * Each rule maps to a specific trust/privacy boundary the product depends on —
 * these are not style preferences.
 */
class ModuleBoundaryRulesTest {

    private static JavaClasses classes;

    @BeforeAll
    static void importClasses() {
        classes = new ClassFileImporter()
                .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
                .importPackages("com.bodywhy");
    }

    @Test
    void contentModuleHasNoOutboundDependencies() {
        ArchRule rule = noClasses()
                .that().resideInAPackage("com.bodywhy.content..")
                .should().dependOnClassesThat()
                .resideInAnyPackage(
                        "com.bodywhy.identity..",
                        "com.bodywhy.signals..",
                        "com.bodywhy.progress..",
                        "com.bodywhy.aiorchestration.."
                );
        rule.check(classes);
    }

    @Test
    void nothingDependsOnAiOrchestration() {
        ArchRule rule = noClasses()
                .that().resideOutsideOfPackage("com.bodywhy.aiorchestration..")
                .and().resideOutsideOfPackage("com.bodywhy.web..")
                .should().dependOnClassesThat()
                .resideInAPackage("com.bodywhy.aiorchestration..");
        rule.check(classes);
    }

    @Test
    void contentInternalsAreNotAccessedOutsideContent() {
        noClasses().that().resideOutsideOfPackage("com.bodywhy.content..")
                .should().dependOnClassesThat().resideInAPackage("com.bodywhy.content.internal..")
                .check(classes);
    }

    @Test
    void identityInternalsAreNotAccessedOutsideIdentity() {
        noClasses().that().resideOutsideOfPackage("com.bodywhy.identity..")
                .should().dependOnClassesThat().resideInAPackage("com.bodywhy.identity.internal..")
                .check(classes);
    }

    @Test
    void signalsInternalsAreNotAccessedOutsideSignals() {
        noClasses().that().resideOutsideOfPackage("com.bodywhy.signals..")
                .should().dependOnClassesThat().resideInAPackage("com.bodywhy.signals.internal..")
                .check(classes);
    }

    @Test
    void progressInternalsAreNotAccessedOutsideProgress() {
        noClasses().that().resideOutsideOfPackage("com.bodywhy.progress..")
                .should().dependOnClassesThat().resideInAPackage("com.bodywhy.progress.internal..")
                .check(classes);
    }

    @Test
    void aiOrchestrationInternalsAreNotAccessedOutsideAiOrchestration() {
        noClasses().that().resideOutsideOfPackage("com.bodywhy.aiorchestration..")
                .should().dependOnClassesThat().resideInAPackage("com.bodywhy.aiorchestration.internal..")
                .check(classes);
    }
}
