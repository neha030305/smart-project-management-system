package com.smartprojectms.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartprojectms.dto.ProjectRequest;
import com.smartprojectms.entity.Project;
import com.smartprojectms.service.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    private final ProjectService projectService;

    // CREATE PROJECT
    @PostMapping
    @PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
    public ResponseEntity<Project> createProject(
            @Valid @RequestBody ProjectRequest request
    ) {

        return ResponseEntity.ok(
                projectService.createProject(request)
        );
    }

    // GET ALL PROJECTS
    @GetMapping
    @PreAuthorize("hasAnyRole('USER','MANAGER','ADMIN')")
    public ResponseEntity<List<Project>> getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    // DELETE PROJECT
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteProject(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                projectService.deleteProject(id)
        );
    }
}
