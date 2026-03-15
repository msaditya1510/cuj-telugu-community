package com.telugu.cuj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telugu.cuj.entity.Alumni;
import com.telugu.cuj.entity.User.UserStatus;

@Repository
public interface AlumniRepo extends JpaRepository<Alumni, Long> {

	List<Alumni> findByStatus(UserStatus status);

	List<Alumni> findByDepartmentAndStatus(String department, UserStatus status);

	List<Alumni> findByStatusAndNameContainingIgnoreCase(UserStatus status,String name);

	List<Alumni> findByDepartmentAndStatusAndNameContainingIgnoreCase(String department,
			UserStatus status, String name);

}
