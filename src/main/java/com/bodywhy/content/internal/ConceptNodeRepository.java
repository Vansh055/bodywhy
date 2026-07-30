package com.bodywhy.content.internal;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

interface ConceptNodeRepository extends JpaRepository<ConceptNodeEntity, UUID> {

    Optional<ConceptNodeEntity> findByTypeAndTitle(NodeType type, String title);

}