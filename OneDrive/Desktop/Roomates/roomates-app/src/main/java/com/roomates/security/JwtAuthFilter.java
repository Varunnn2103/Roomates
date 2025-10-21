package com.roomates.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component // Mark this as a Spring bean
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Get the Authorization header
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // 2. Check if it's a Bearer token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); // Extract the token
            try {
                username = jwtService.extractUsername(token);
            } catch (Exception e) {
                // Invalid token
                logger.warn("JWT token is invalid: " + e.getMessage());
            }
        }

        // 3. If we have a username and the user is not already authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load the user from the database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // 4. Validate the token
            if (jwtService.validateToken(token, userDetails)) {
                // 5. If valid, create an authentication token
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null, // We don't need credentials
                        userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 6. Set the user in the Spring Security Context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 7. Pass the request to the next filter
        filterChain.doFilter(request, response);
    }
}