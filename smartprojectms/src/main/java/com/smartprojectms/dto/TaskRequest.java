package com.smartprojectms.dto;

import com.smartprojectms.entity.TaskPriority;
import com.smartprojectms.entity.TaskStatus;

import lombok.Data;

@Data
public class TaskRequest {

    private String title;

    private String description;

    private TaskStatus status;

    private TaskPriority priority;

    private Long assignedUserId;

    private Long projectId;
}
