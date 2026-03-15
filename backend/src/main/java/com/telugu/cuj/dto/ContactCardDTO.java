package com.telugu.cuj.dto;

import com.telugu.cuj.entity.Address;
import com.telugu.cuj.entity.User.UserType;

import jakarta.persistence.Embedded;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ContactCardDTO {

	@NotBlank
	private Long id;	
	
	@NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
	protected String name;
	
	@NotBlank(message = "Preferred name is required")
	@Size(min = 2, max = 50, message = "Preferred name must be between 2 and 50 characters")
	protected String preferredName;
	
	protected String photoUrl;	
	
	@NotNull(message = "User type is required")
	@Enumerated(EnumType.STRING)
	private UserType userType;
	
	@Embedded
	protected Address address;
	
	@NotBlank(message = "Department is required")
    @Size(max = 100, message = "Department cannot exceed 100 characters")
	private String department;

	public ContactCardDTO(@NotBlank Long id,
			@NotBlank(message = "Full name is required") @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters") String name,
			@NotBlank(message = "Preferred name is required") @Size(min = 2, max = 50, message = "Preferred name must be between 2 and 50 characters") String preferredName,
			String photoUrl,@NotNull(message = "User type is required") UserType userType, Address address,
			@NotBlank(message = "Department is required") @Size(max = 100, message = "Department cannot exceed 100 characters") String department) {
		super();
		this.id = id;
		this.name = name;
		this.preferredName = preferredName;
		this.photoUrl = photoUrl;
		this.userType = userType;
		this.address = address;
		this.department = department;
	}

	public ContactCardDTO() {
		super();
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

	public String getPreferredName() {
		return preferredName;
	}

	public void setPreferredName(String preferredName) {
		this.preferredName = preferredName;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
	
}
