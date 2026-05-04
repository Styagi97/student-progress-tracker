package com.shivani.student_progress_tracker_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling

public class StudentProgressTrackerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentProgressTrackerBackendApplication.class, args);
	}

}
