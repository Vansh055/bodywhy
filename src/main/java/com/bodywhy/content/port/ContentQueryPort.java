package com.bodywhy.content.port;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ContentQueryPort {

    Optional<ConceptNodeView> getApprovedNode(UUID id);

    List<ConceptNodeView> getRelatedConcepts(UUID id);

    List<ConceptNodeView> findRelevantApprovedContent(String naturalLanguageQuery, int limit);
}
