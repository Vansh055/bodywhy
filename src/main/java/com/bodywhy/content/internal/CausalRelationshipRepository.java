package com.bodywhy.content.internal;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

interface CausalRelationshipRepository extends JpaRepository<CausalRelationshipEntity, UUID> {

    // The Workflow 3 lazy-consistency query: an edge only counts as "live" if it's
    // approved AND both endpoint nodes are currently approved. Implemented as one
    // query rather than a stored flag, so a node degrading to NEEDS_UPDATE is
    // reflected immediately with no extra write anywhere.
    @org.springframework.data.jpa.repository.Query("""
        SELECT e FROM CausalRelationshipEntity e
        WHERE (e.sourceNodeId = :nodeId OR e.targetNodeId = :nodeId)
        AND e.reviewStatus = 'APPROVED'
        AND e.sourceNodeId IN (SELECT n.id FROM ConceptNodeEntity n WHERE n.reviewStatus = 'APPROVED')
        AND e.targetNodeId IN (SELECT n.id FROM ConceptNodeEntity n WHERE n.reviewStatus = 'APPROVED')
        """)
    List<CausalRelationshipEntity> findLiveEdgesTouching(UUID nodeId);
}