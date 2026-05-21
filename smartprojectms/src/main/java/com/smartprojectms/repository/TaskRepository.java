package com.smartprojectms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.smartprojectms.entity.Task;

import jakarta.transaction.Transactional;

public interface TaskRepository extends JpaRepository<Task, Long> {

	@Transactional
	@Modifying
	void deleteByProjectId(Long id);
}
