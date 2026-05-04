// Validates JWT token for every incoming request 
// Intercepts incoming requests
// Sets authentication in Spring Security context

package com.shivani.student_progress_tracker_backend.config;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
    
    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
        filterChain.doFilter(request, response);
        return;
    }

     if (request.getServletPath().startsWith("/api/auth")) {
        filterChain.doFilter(request, response);
        return;
    }
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
         
 if (jwtUtil.validateToken(token)) {
    String email = jwtUtil.extractEmail(token);

                    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, null,
                            List.of());
                    SecurityContextHolder.getContext().setAuthentication(auth);

                }
           }  
            
        }
// Intercepts every request
        filterChain.doFilter(request, response);
    }

}
