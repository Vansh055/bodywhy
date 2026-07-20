package com.bodywhy.identity.internal;

import com.bodywhy.identity.port.IdentityPort;
import com.bodywhy.identity.port.UserSummary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
class IdentityService implements IdentityPort {
    private final UserRepository repository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    IdentityService(UserRepository repository, JwtService jwtService) {
        this.repository = repository;
        this.jwtService = jwtService;
    }

    @Override
    public Optional<UUID> validateToken(String token) {
        return jwtService.validate(token);
    }

    @Override
    public Optional<UserSummary> getUserSummary(UUID id) {
        return repository.findById(id).map(u -> new UserSummary(u.getId(), u.getEmail()));
    }

    @Override
    @Transactional
    public UUID register(String email, String rawPassword) {
        repository.findByEmail(email).ifPresent(u -> {
            throw new IllegalArgumentException("Email already registered");
        });
        var user = new UserEntity(UUID.randomUUID(), email, encoder.encode(rawPassword));
        repository.save(user);
        return user.getId();
    }

    @Override
    public Optional<String> login(String email, String rawPassword) {
        return repository.findByEmail(email)
                .filter(u -> encoder.matches(rawPassword, u.getPasswordHash()))
                .map(u -> jwtService.issue(u.getId()));
    }
}