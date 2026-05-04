package com.shivani.student_progress_tracker_backend.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shivani.student_progress_tracker_backend.config.JwtUtil;
import com.shivani.student_progress_tracker_backend.dto.LoginRequest;
import com.shivani.student_progress_tracker_backend.model.User;
import com.shivani.student_progress_tracker_backend.service.UserService;

// Handles authentication APIs (register, login, logout, refresh)
// Uses JWT for stateless authentication

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // Register new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = userService.register(user);

            return ResponseEntity.ok(Map.of(
                    "message", "User registered. Please verify email 📧",
                    "email", savedUser.getEmail()));

        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Email already exists ❌"));
        }
    }

    // Authenticates user and returns access token + refresh token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<User> loggedUser = userService.login(
                request.getEmail(),
                request.getPassword());

        if (loggedUser.isPresent()) {
            User u = loggedUser.get();

            String token = jwtUtil.generateToken(u.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(u.getEmail());

            // Save refresh token in DB
            userService.saveRefreshToken(u, refreshToken);

            return ResponseEntity.ok(Map.of(
                    "id", u.getId(),
                    "username", u.getUsername(),
                    "email", u.getEmail(),
                    "token", token,
                    "refreshToken", refreshToken));
        } else {
            return ResponseEntity
                    .status(401)
                    .body(Map.of("error", "Invalid email or password ❌"));
        }
    }

    // Logs out user by invalidating refresh token
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        // 1. Check if token is provided
        if (refreshToken == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Refresh token required"));
        }

        // 2. Validate JWT structure & signature
        if (!jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Invalid token"));
        }

        try {
            // 3. Extract email from token
            String email = jwtUtil.extractEmail(refreshToken);

            // 4. Fetch user from DB
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 5. Match token with DB
            if (!refreshToken.equals(user.getRefreshToken())) {
                return ResponseEntity.status(401)
                        .body(Map.of("error", "Token mismatch"));
            }
            // 6. Invalidate token(logout)
            userService.clearRefreshToken(user);

            return ResponseEntity.ok(Map.of("message", "Logged out successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Invalid token"));
        }
    }

    // Generates new access token using valid refresh token
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        // 1. Check missing token
        if (refreshToken == null) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "No refresh token"));
        }

        // 2.Validate JWT
        if (!jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Invalid token"));
        }

        try {
 // 3. Extract email
            String email = jwtUtil.extractEmail(refreshToken);

               // 4. Fetch user
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 5. Match with DB
            if (!refreshToken.equals(user.getRefreshToken())) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid refresh token"));
            }

            // 6. Check expiry (DB level)

            if (user.getRefreshTokenExpiry().isBefore(LocalDateTime.now())) {
                return ResponseEntity.status(401).body(Map.of("error", "Refresh token expired"));
            }

            // 7. Generate new access token

            String newAccessToken = jwtUtil.generateToken(email);

            return ResponseEntity.ok(Map.of("token", newAccessToken));

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid refresh token"));
        }

    }
}