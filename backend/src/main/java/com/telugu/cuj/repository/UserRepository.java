package com.telugu.cuj.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telugu.cuj.entity.User;
import com.telugu.cuj.entity.User.Role;
import com.telugu.cuj.entity.User.UserStatus;
import com.telugu.cuj.entity.User.UserType;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUserName(String userName);

	boolean existsByUserName(String userName);
	
	boolean existsByRole(Role role);

	boolean existsByEmail(String email);

	boolean existsByPhone(String phone);

	List<User> findUserByUserType(UserType type);

	Page<User> findByStatus(UserStatus status,Pageable pageable);

	boolean existsByName(String name);

	Page<User> findByStatusAndUserType(UserStatus status, UserType userType, Pageable pageable);
	
	Optional<User> findByEmail(String email);

}
