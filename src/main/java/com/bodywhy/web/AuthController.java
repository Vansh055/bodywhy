package com.bodywhy.web;

import com.bodywhy.identity.port.IdentityPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

record AuthRequest(String email, String password) {}
record TokenResponse(String token) {}

@RestController
@RequestMapping("/api/auth")
class AuthController {
    private final IdentityPort identity;
    AuthController(IdentityPort identity) { this.identity = identity; }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody AuthRequest req) {
        identity.register(req.email(), req.password());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody AuthRequest req) {
        return identity.login(req.email(), req.password())
                .map(token -> ResponseEntity.ok(new TokenResponse(token)))
                .orElse(ResponseEntity.status(401).build());
    }
}