// User entity mapped to database table
// Stores authentication and refresh token data

package com.shivani.student_progress_tracker_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String username;

    @Column(unique = true)
    private String email;
    private String password;

    // Stores refresh token for session renewal
    @Column(length = 500)
    private String refreshToken;

    // Expiry time for refresh token
    private LocalDateTime refreshTokenExpiry;

    private int streakCount;
private LocalDateTime lastActiveDate;

    public int getStreakCount() {
    return streakCount;
}

public void setStreakCount(int streakCount) {
    this.streakCount = streakCount;
}

public LocalDateTime getLastActiveDate() {
    return lastActiveDate;
}

public void setLastActiveDate(LocalDateTime lastActiveDate) {
    this.lastActiveDate = lastActiveDate;
}

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public LocalDateTime getRefreshTokenExpiry() {
        return refreshTokenExpiry;
    }

    public void setRefreshTokenExpiry(LocalDateTime refreshTokenExpiry) {
        this.refreshTokenExpiry = refreshTokenExpiry;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User() {
    };

    public User(Long id, String username, String email, String password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

}