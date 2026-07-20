package com.bodywhy.identity.internal;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
class UserEntity {
    @Id private UUID id;
    private String email;
    @Column(name = "password_hash") private String passwordHash;
    @Enumerated(EnumType.STRING) private UserStatus status = UserStatus.ACTIVE;
    @Column(name = "created_at") private Instant createdAt = Instant.now();

    protected UserEntity() {}
    UserEntity(UUID id, String email, String passwordHash) {
        this.id = id; this.email = email; this.passwordHash = passwordHash;
    }
    UUID getId() { return id; }
    String getEmail() { return email; }
    String getPasswordHash() { return passwordHash; }
    UserStatus getStatus() { return status; }
}

enum UserStatus { ACTIVE, DEACTIVATED }