// Handles CRUD operations for tasks
// Each task belongs  to a specific user (userId based)

package com.shivani.student_progress_tracker_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shivani.student_progress_tracker_backend.model.Task;
import com.shivani.student_progress_tracker_backend.service.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // =========================
    // GET ALL TASKS BY USER
    // =========================
    @GetMapping("/{userId}")
    public List<Task> getTasks(@PathVariable Long userId) {
        return taskService.getUserTasks(userId);
    }

    // =========================
    // CREATE TASK
    // =========================
    @PostMapping
    public Task createTask(@Valid @RequestBody Task task) {
        return taskService.createTask(task);
    }

    // =========================
    // UPDATE TASK
    // =========================
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    // =========================
    // DELETE TASK
    // =========================
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    // =========================
    // 📅 TODAY TASKS
    // =========================
    @GetMapping("/today/{userId}")
    public List<Task> todayTasks(@PathVariable Long userId) {
        return taskService.getTodayTasks(userId);
    }

    // =========================
    // ⚠ PENDING / OVERDUE TASKS
    // =========================
    @GetMapping("/pending/{userId}")
    public List<Task> pendingTasks(@PathVariable Long userId) {
        return taskService.getPendingTasks(userId);
    }

    // =========================
    // 📊 DAILY COMPLETION RATE
    // =========================
    @GetMapping("/completion-rate/{userId}")
    public double completionRate(@PathVariable Long userId) {
        return taskService.getDailyCompletionRate(userId);
    }

    // =========================
    // ⚠ OVERDUE TASKS (IMPORTANT ADDITION)
    // =========================
    @GetMapping("/overdue/{userId}")
    public List<Task> overdueTasks(@PathVariable Long userId) {
        return taskService.getOverdueTasks(userId);
    }

    @GetMapping("/suggestion/{userId}")
    public String smartSuggestion(@PathVariable Long userId) {
        return taskService.getSmartSuggestion(userId);
    }
}