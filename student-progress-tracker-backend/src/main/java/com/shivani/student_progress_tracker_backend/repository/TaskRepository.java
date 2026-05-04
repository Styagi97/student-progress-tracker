package com.shivani.student_progress_tracker_backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivani.student_progress_tracker_backend.model.Task;
import com.shivani.student_progress_tracker_backend.model.TaskStatus;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);

    List<Task> findByUserIdAndCreatedAtBetween(
            Long userId,
            LocalDateTime start,
            LocalDateTime end);

    List<Task> findByUserIdAndStatus(Long userId, TaskStatus status);

    List<Task> findByUserIdAndDueDateBetween(
            Long userId,
            LocalDateTime start,
            LocalDateTime end);

    List<Task> findByUserIdAndStatusAndDueDateBefore(
            Long userId,
            TaskStatus status,
            LocalDateTime date);

 
}