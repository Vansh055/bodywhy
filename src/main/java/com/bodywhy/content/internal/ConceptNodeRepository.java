package com.bodywhy.content.internal;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

interface ConceptNodeRepository extends JpaRepository<ConceptNodeEntity, UUID> {
}
