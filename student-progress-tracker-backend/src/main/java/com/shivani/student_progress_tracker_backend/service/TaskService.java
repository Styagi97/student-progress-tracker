package com.shivani.student_progress_tracker_backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.student_progress_tracker_backend.model.Task;
import com.shivani.student_progress_tracker_backend.model.TaskStatus;
import com.shivani.student_progress_tracker_backend.model.User;
import com.shivani.student_progress_tracker_backend.repository.TaskRepository;
import com.shivani.student_progress_tracker_backend.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // =========================
    // GET ALL TASKS
    // =========================

    public List<Task> getUserTasks(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    // =========================
    // CREATE TASK
    // =========================
    public Task createTask(Task task) {
        task.setStatus(TaskStatus.PENDING);

 task.setCreatedAt(LocalDateTime.now());
    task.setUpdatedAt(LocalDateTime.now());
    
        return taskRepository.save(task);
    }

    // =========================
    // UPDATE TASK+ STREAK LOGIC
    // =========================
    public Task updateTask(Long id, Task updatedTask) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());

        TaskStatus oldStatus = task.getStatus();
        task.setStatus(updatedTask.getStatus());
        Task saved = taskRepository.save(task);

        // 🔥 STREAK LOGIC (ONLY WHEN COMPLETED)
        if (oldStatus != TaskStatus.COMPLETED &&
                updatedTask.getStatus() == TaskStatus.COMPLETED) {

            User user = userRepository.findById(task.getUserId())
                    .orElseThrow();

            userService.updateStreak(user);
            userRepository.save(user);
        }

        return saved;
    }

    // =========================
    // DELETE TASK
    // =========================
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // =========================
    // 📅 TODAY TASKS (BY DUE DATE)
    // =========================
    public List<Task> getTodayTasks(Long userId) {
        LocalDateTime start = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime end = start.plusDays(1);

        return taskRepository.findByUserIdAndCreatedAtBetween(userId, start, end);
    }

    // =========================
    // ⚠ PENDING TASKS
    // =========================
    public List<Task> getPendingTasks(Long userId) {
        return taskRepository.findByUserIdAndStatus(userId, TaskStatus.PENDING);
    }

    // =========================
    // 🧠 SMART SUGGESTION ENGINE
    // =========================
    public String getSmartSuggestion(Long userId) {

        List<Task> tasks = taskRepository.findByUserId(userId);

        // =========================
        // ⚠ OVERDUE TASKS
        // =========================
        boolean hasOverdue = tasks.stream()
                .anyMatch(t -> t.getStatus() == TaskStatus.PENDING &&
                        t.getDueDate() != null &&
                        t.getDueDate().isBefore(LocalDateTime.now()));

        if (hasOverdue) {
            return "⚠ Start with overdue tasks first";
        }
        // =========================
        // 📅 TODAY TASKS
        // =========================
        boolean hasTodayTasks = tasks.stream()
                .anyMatch(t -> t.getCreatedAt().toLocalDate().isEqual(LocalDate.now()));

        if (hasTodayTasks) {
            return "📅 Complete today's tasks to stay consistent";
        }

        // =========================
        // 📊 COMPLETION RATE
        // =========================
        double rate = getDailyCompletionRate(userId);
        if (rate < 50) {
            return "📌 Try breaking tasks into smaller steps";
        }

        return "🔥 Great work! Keep your streak alive";
    }

    // =========================
    // ⚠ OVERDUE TASKS
    // =========================
    public List<Task> getOverdueTasks(Long userId) {

        return taskRepository.findByUserIdAndStatusAndDueDateBefore(
                userId,
                TaskStatus.PENDING,
                LocalDateTime.now());
    }

    // =========================
    // 📊 DAILY COMPLETION RATE
    // =========================

    public double getDailyCompletionRate(Long userId) {

        LocalDateTime start = LocalDate.now().atStartOfDay();
        LocalDateTime end = start.plusDays(1);

        List<Task> tasks = taskRepository.findByUserIdAndCreatedAtBetween(
                userId, start, end);

        long total = tasks.size();
        long completed = tasks.stream()
                .filter(t -> t.getStatus() == TaskStatus.COMPLETED)
                .count();

        return total == 0 ? 0 : (completed * 100.0 / total);
    }

    public double getWeeklyCompletionRate(Long userId) {

    LocalDateTime start = LocalDate.now().minusDays(7).atStartOfDay();
    LocalDateTime end = LocalDateTime.now();

    List<Task> tasks = taskRepository.findByUserIdAndCreatedAtBetween(
            userId, start, end);

    long total = tasks.size();

    long completed = tasks.stream()
            .filter(t -> t.getStatus() == TaskStatus.COMPLETED)
            .count();

    return total == 0 ? 0 : (completed * 100.0 / total);
}

}
