package com.bodywhy.progress.internal;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

interface AiInteractionRecordRepository extends JpaRepository<AiInteractionRecordEntity, UUID> {
}
