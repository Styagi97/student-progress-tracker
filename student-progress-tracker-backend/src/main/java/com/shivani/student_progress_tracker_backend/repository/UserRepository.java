package com.shivani.student_progress_tracker_backend.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivani.student_progress_tracker_backend.model.User;
 
 
public interface  UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
       User  findByRefreshToken(String refreshToken);
}