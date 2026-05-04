package com.shivani.student_progress_tracker_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.shivani.student_progress_tracker_backend.model.User;
import com.shivani.student_progress_tracker_backend.repository.UserRepository;

@Component
public class WeeklyReportScheduler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskService taskService;

    // Runs every Sunday 8 AM
    @Scheduled(cron = "0 0 8 * * SUN")
    public void sendWeeklyReports() {

        List<User> users = userRepository.findAll();

        for (User user : users) {

            double rate = taskService.getWeeklyCompletionRate(user.getId());

            String report = "🔥 Weekly Productivity Report\n\n" +
                    "User: " + user.getUsername() + "\n" +
                    "Streak: " + user.getStreakCount() + " days\n" +
                    "Weekly Completion Rate: " + String.format("%.2f", rate) + "%\n\n" +
                    "Keep going! 🚀";

            System.out.println("===== REPORT =====");
            System.out.println(report);

        }
    }
}
