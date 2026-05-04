// Handles business logic for user authentication and management

package com.shivani.student_progress_tracker_backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shivani.student_progress_tracker_backend.model.User;
import com.shivani.student_progress_tracker_backend.repository.UserRepository;
 
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;


// Registers user and encrypts password
    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));

        return userRepository.save(user);
    }


    // Validates user credentials    
    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && encoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    // Finds user by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Saves refresh token and expiry in database
    public void saveRefreshToken(User user, String refreshToken) {
        user.setRefreshToken(refreshToken);
        user.setRefreshTokenExpiry(LocalDateTime.now().plusDays(7));
        userRepository.save(user);
    }

    // Clears refresh token from DB (logout)
public void clearRefreshToken(User user) {
    user.setRefreshToken(null);
    user.setRefreshTokenExpiry(null);
    userRepository.save(user);
}

//streakCount
public void updateStreak(User user){

    LocalDate today = LocalDate.now();

    if(user.getLastActiveDate() == null){
       user.setStreakCount(1);
    }
    else{

      long days = java.time.temporal.ChronoUnit.DAYS.between(
                user.getLastActiveDate().toLocalDate(),
            today
        );
        if(days == 1){
            user.setStreakCount(user.getStreakCount() +1 );
        }
        else if(days > 1){
            user.setStreakCount(1);// reset
        }
    }
    user.setLastActiveDate(LocalDateTime.now());
}
}