package com.bodywhy.identity.port;

import java.util.UUID;

public record UserSummary(UUID id, String email) {}