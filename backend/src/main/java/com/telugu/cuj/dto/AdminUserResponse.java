package com.telugu.cuj.dto;

import java.time.LocalDateTime;

import com.telugu.cuj.entity.User.UserType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AdminUserResponse {

	private Long id;
	@NotBlank
	@Size(min=3,max=100)
	private String name;
	
	@NotBlank
	private String username;
	
	@NotBlank
	@Email
	@Size(max = 255)
	private String email;
	@NotBlank
	@Size(min = 2, max = 100)
	private String department;
	@NotNull
	private UserType userType;
	
	private LocalDateTime createdAt;
	
	private String approvedBy;
	
	private LocalDateTime approvedAt;

	public AdminUserResponse() {
		super();
	}
	
	
	public AdminUserResponse(Long id, @NotBlank @Size(min = 3, max = 100) String name,
			@NotBlank @Email @Size(max = 255) String email, @NotBlank @Size(min = 2, max = 100) String department,
			@NotNull UserType userType, LocalDateTime createdAt, String approvedBy, LocalDateTime approvedAt,String username) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.department = department;
		this.userType = userType;
		this.createdAt = createdAt;
		this.approvedBy = approvedBy;
		this.username=username;
		this.approvedAt = approvedAt;
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public UserType getUserType() {
		return userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	public String getApprovedBy() {
		return approvedBy;
	}

	public void setApprovedBy(String approvedBy) {
		this.approvedBy = approvedBy;
	}

	public LocalDateTime getApprovedAt() {
		return approvedAt;
	}

	public void setApprovedAt(LocalDateTime approvedAt) {
		this.approvedAt = approvedAt;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}
	
}
