package com.bodywhy.web.security;

import com.bodywhy.identity.port.IdentityPort;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
class JwtAuthFilter extends OncePerRequestFilter {

    private final IdentityPort identity;

    JwtAuthFilter(IdentityPort identity) {
        this.identity = identity;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        System.out.println("======================================");
        System.out.println("REQUEST: " + request.getMethod() + " " + request.getRequestURI());

        String header = request.getHeader("Authorization");
        System.out.println("AUTH HEADER = " + header);

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            System.out.println("TOKEN FOUND");
            System.out.println("TOKEN = " + token);

            var result = identity.validateToken(token);

            System.out.println("VALIDATION RESULT = " + result);

            result.ifPresent(userId -> {
                System.out.println("AUTHENTICATED USER = " + userId);

                var auth = new UsernamePasswordAuthenticationToken(
                        userId,
                        null,
                        List.of()
                );

                SecurityContextHolder.getContext().setAuthentication(auth);
            });

        } else {
            System.out.println("NO BEARER TOKEN FOUND");
        }

        System.out.println("======================================");

        chain.doFilter(request, response);
    }
}