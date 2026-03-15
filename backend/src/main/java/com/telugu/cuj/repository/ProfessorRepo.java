package com.telugu.cuj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telugu.cuj.entity.Professor;
import com.telugu.cuj.entity.User.UserStatus;

@Repository
public interface ProfessorRepo extends JpaRepository<Professor, Long> {

	List<Professor> findByStatus(UserStatus status);

	List<Professor> findByDepartmentAndStatus(String department,UserStatus status);

	List<Professor> findByStatusAndNameContainingIgnoreCase(UserStatus status, String name);

	List<Professor> findByDepartmentAndStatusAndNameContainingIgnoreCase(String department,
			UserStatus status,String name);


}
