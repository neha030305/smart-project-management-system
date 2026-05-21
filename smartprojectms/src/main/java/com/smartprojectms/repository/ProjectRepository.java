package com.smartprojectms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartprojectms.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
