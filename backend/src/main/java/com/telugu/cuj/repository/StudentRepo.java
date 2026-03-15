package com.telugu.cuj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telugu.cuj.entity.Student;
import com.telugu.cuj.entity.User.UserStatus;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long>{

	List<Student> findByStatus(UserStatus status);

	List<Student> findByDepartmentAndStatus(String department, UserStatus status);


	 List<Student> findByDepartmentAndStatusAndNameContainingIgnoreCase(String department,
			UserStatus status, String name);

	  List<Student> findByStatusAndNameContainingIgnoreCase(UserStatus status, String name);

}
