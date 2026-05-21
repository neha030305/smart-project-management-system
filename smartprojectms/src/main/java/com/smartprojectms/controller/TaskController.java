package com.smartprojectms.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartprojectms.dto.TaskRequest;
import com.smartprojectms.entity.Task;
import com.smartprojectms.service.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    // CREATE TASK
    @PostMapping
    @PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
    public ResponseEntity<Task> createTask(
            @RequestBody TaskRequest request
    ) {

        return ResponseEntity.ok(
                taskService.createTask(request)
        );
    }

    // GET ALL TASKS
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','MANAGER','ADMIN')")
    public ResponseEntity<List<Task>> getAllTasks() {

        return ResponseEntity.ok(
                taskService.getAllTasks()
        );
    }

    // DELETE TASK
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                taskService.deleteTask(id)
        );
    
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('USER','MANAGER','ADMIN')")
    public ResponseEntity<Task> updateTaskStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return ResponseEntity.ok(
                taskService.updateTaskStatus(id, status)
        );
    }
}
