/**
 * The ONLY module permitted to hold a reference to the LLM client.
 * Reads from content (approved-only) and signals; writes to neither.
 *
 * Dependency rule: NOTHING depends on this module. AI output must never
 * be consumed internally as privileged/trusted data by another module.
 * Enforced by ModuleBoundaryRulesTest.
 */
package com.bodywhy.aiorchestration;