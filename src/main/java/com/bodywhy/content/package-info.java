/**
 * Owns concept nodes, causal relationships, tiers, sources, and review status.
 * The single source of truth for "what do we know, and has a human verified it."
 *
 * Dependency rule: this module has ZERO outbound dependencies on any other
 * module. Enforced by ModuleBoundaryRulesTest.
 */
package com.bodywhy.content;