package com.bodywhy.identity.internal;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Component
class JwtService {

    private final SecretKey key;
    private final long expirationMs;

    JwtService(@Value("${app.jwt.secret}") String secret,
               @Value("${app.jwt.expiration-ms}") long expirationMs) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationMs = expirationMs;
    }

    String issue(UUID userId) {
        return Jwts.builder()
                .subject(userId.toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();
    }

    Optional<UUID> validate(String token) {

        try {
            System.out.println("======================================");
            System.out.println("JWT TOKEN RECEIVED:");
            System.out.println(token);

            String subject = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();

            System.out.println("JWT VALID");
            System.out.println("JWT SUBJECT = " + subject);
            System.out.println("======================================");

            return Optional.of(UUID.fromString(subject));

        } catch (Exception e) {

            System.out.println("======================================");
            System.out.println("JWT VALIDATION FAILED");
            e.printStackTrace();
            System.out.println("======================================");

            return Optional.empty();
        }
    }
}