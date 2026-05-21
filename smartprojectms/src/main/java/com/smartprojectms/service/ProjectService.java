package com.smartprojectms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartprojectms.dto.ProjectRequest;
import com.smartprojectms.entity.Project;
import com.smartprojectms.entity.User;
import com.smartprojectms.exception.ResourceNotFoundException;
import com.smartprojectms.repository.ProjectRepository;
import com.smartprojectms.repository.TaskRepository;
import com.smartprojectms.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    // CREATE PROJECT
    public Project createProject(ProjectRequest request) {

    	User manager = userRepository.findById(request.getManagerId())
    	        .orElseThrow(() ->
    	                new ResourceNotFoundException("Manager not found"));

    	if (!manager.getRole().name().equals("MANAGER")
    	        && !manager.getRole().name().equals("ADMIN")) {

    	    throw new RuntimeException(
    	            "Selected user is not a manager/admin"
    	    );
    	}
    	
        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .manager(manager)
                .build();

        return projectRepository.save(project);
    }

    // GET ALL PROJECTS
    public List<Project> getAllProjects() {

        return projectRepository.findAll();
    }

    // DELETE PROJECT
    public String deleteProject(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found"
                        ));

        // delete related tasks first
        taskRepository.deleteByProjectId(id);

        projectRepository.delete(project);

        return "Project deleted successfully";
    }
}
