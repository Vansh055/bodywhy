package com.bodywhy.identity.port;

import java.util.Optional;
import java.util.UUID;

public interface IdentityPort {
    Optional<UUID> validateToken(String token);
    Optional<UserSummary> getUserSummary(UUID id);
    UUID register(String email, String rawPassword);
    Optional<String> login(String email, String rawPassword); // returns JWT
}
