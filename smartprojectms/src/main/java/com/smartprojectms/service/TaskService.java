package com.smartprojectms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartprojectms.dto.TaskRequest;
import com.smartprojectms.entity.Project;
import com.smartprojectms.entity.Task;
import com.smartprojectms.entity.TaskStatus;
import com.smartprojectms.entity.User;
import com.smartprojectms.exception.ResourceNotFoundException;
import com.smartprojectms.repository.ProjectRepository;
import com.smartprojectms.repository.TaskRepository;
import com.smartprojectms.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    // CREATE TASK
    public Task createTask(TaskRequest request) {

        User assignedUser = userRepository.findById(
                request.getAssignedUserId()
        ).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));

        Project project = projectRepository.findById(
                request.getProjectId()
        ).orElseThrow(() ->
                new ResourceNotFoundException("Project not found"));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .priority(request.getPriority())
                .assignedUser(assignedUser)
                .project(project)
                .build();

        return taskRepository.save(task);
    }

    // GET ALL TASKS
    public List<Task> getAllTasks() {

        return taskRepository.findAll();
    }

    // DELETE TASK
    public String deleteTask(Long id) {

        taskRepository.deleteById(id);

        return "Task deleted successfully";
    }
    
    public Task updateTaskStatus(Long id, String status) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));

        task.setStatus(
                TaskStatus.valueOf(status)
        );

        return taskRepository.save(task);
    }
}
