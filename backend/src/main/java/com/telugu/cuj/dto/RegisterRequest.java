package com.telugu.cuj.dto;

import java.time.LocalDateTime;

import com.telugu.cuj.entity.Address;
import com.telugu.cuj.entity.SocialLinks;
import com.telugu.cuj.entity.User.UserType;

import jakarta.persistence.Embedded;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

	@NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
    private String userName;
	
	@NotBlank(message = "Password is required")
	@Size(min = 6, message = "Password must be at least 6 characters long")
	protected String password;
	
	
	@NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
	protected String name;
	
	@NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
	protected String email;
	
	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Please provide a valid Indian phone number")
	protected String phone;
	
	@NotBlank(message = "Preferred name is required")
	@Size(min = 2, max = 50, message = "Preferred name must be between 2 and 50 characters")
	protected String preferredName;
	
	@NotBlank(message = "Department is required")
    @Size(max = 100, message = "Department cannot exceed 100 characters")
	private String department;         // for Student
	
	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
	
	protected String photoUrl;
	
	@Size(max = 500, message = "Bio cannot exceed 500 characters")
	protected String bio; 
	
	protected boolean approved = false;
	
	@NotNull(message = "User role is required")
    @Enumerated(EnumType.STRING)
    protected UserType userType;
	
	@Embedded
	protected SocialLinks socialLinks;
	
	@Embedded
	protected Address address;
	
	protected LocalDateTime createdAt;
	
	//student specific fields
	
	@Pattern(regexp = "^[2][0-9]{10}$", message = "Roll number can only contain numbers")
	private String rollNo; 
	
	 @Size(max = 100, message = "Course name cannot exceed 100 characters")
	    private String course;
		
	    @Min(value = 1, message = "Year must be at least 1")
	    @Max(value = 5, message = "Year cannot exceed 5")
		private Integer currentYear;
		
		@Size(max = 1000, message = "Skills cannot exceed 1000 characters")
		private String skills;
		    
		@Size(max = 1000, message = "Achievements cannot exceed 1000 characters")
	    private String studentAchievements;

		//alumni specific 
		 @Min(value = 2000, message = "Graduation year must be from 2000 onwards")
		    private Integer graduationYear;

		    @Size(max = 200, message = "Current status cannot exceed 200 characters")
		    private String currentStatus;

		    @Size(max = 100, message = "Current company cannot exceed 100 characters")
		    private String currentCompany;

		    @Size(max = 1000, message = "Achievements cannot exceed 1000 characters")
		    private String alumniAchievements;

		    @Size(max = 50, message = "Current location cannot exceed 50 characters")
		    private String currentLocation;

	// professor specific
		    @Size(max = 100, message = "Designation cannot exceed 100 characters")
		    private String designation; // Assistant Professor, Associate Professor, Professor, etc.

		    @Size(max = 500, message = "Qualifications cannot exceed 500 characters")
		    private String qualifications; // "Ph.D in Computer Science, M.Tech, B.Tech"

		    @Size(max = 200, message = "Specialization cannot exceed 200 characters")
		    private String specialization; // "Artificial Intelligence, Machine Learning"

		    @Size(max = 100, message = "Experience cannot exceed 100 characters")
		    private String experience; // "15+ years", "Since 2008"

		    @Size(max = 1000, message = "Research interests cannot exceed 1000 characters")
		    private String researchInterests;
		    
		    

			public String getUserName() {
				return userName;
			}

			public void setUserName(String userName) {
				this.userName = userName;
			}

			public String getPassword() {
				return password;
			}

			public void setPassword(String password) {
				this.password = password;
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

			public String getPhone() {
				return phone;
			}

			public void setPhone(String phone) {
				this.phone = phone;
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

			public String getBio() {
				return bio;
			}

			public void setBio(String bio) {
				this.bio = bio;
			}

			public boolean isApproved() {
				return approved;
			}

			public void setApproved(boolean approved) {
				this.approved = approved;
			}

			public UserType getUserType() {
				return userType;
			}

			public void setType(UserType userType) {
				this.userType = userType;
			}

			public SocialLinks getSocialLinks() {
				return socialLinks;
			}

			public void setSocialLinks(SocialLinks socialLinks) {
				this.socialLinks = socialLinks;
			}

			public Address getAddress() {
				return address;
			}

			public void setAddress(Address address) {
				this.address = address;
			}

			public LocalDateTime getCreatedAt() {
				return createdAt;
			}

			public void setCreatedAt(LocalDateTime createdAt) {
				this.createdAt = createdAt;
			}

			public String getRollNo() {
				return rollNo;
			}

			public void setRollNo(String rollNo) {
				this.rollNo = rollNo;
			}

			public String getCourse() {
				return course;
			}

			public void setCourse(String course) {
				this.course = course;
			}

			public Integer getCurrentYear() {
				return currentYear;
			}

			public void setCurrentYear(Integer currentYear) {
				this.currentYear = currentYear;
			}

			public String getSkills() {
				return skills;
			}

			public void setSkills(String skills) {
				this.skills = skills;
			}

			public String getStudentAchievements() {
				return studentAchievements;
			}

			public void setStudentAchievements(String achievements) {
				this.studentAchievements = achievements;
			}

			public Integer getGraduationYear() {
				return graduationYear;
			}

			public void setGraduationYear(Integer graduationYear) {
				this.graduationYear = graduationYear;
			}

			public String getCurrentStatus() {
				return currentStatus;
			}

			public void setCurrentStatus(String currentStatus) {
				this.currentStatus = currentStatus;
			}

			public String getCurrentCompany() {
				return currentCompany;
			}

			public void setCurrentCompany(String currentCompany) {
				this.currentCompany = currentCompany;
			}

			public String getAlumniAchievements() {
				return alumniAchievements;
			}

			public void setAlumniAchievements(String alumniAchievements) {
				this.alumniAchievements = alumniAchievements;
			}

			public String getCurrentLocation() {
				return currentLocation;
			}

			public void setCurrentLocation(String currentLocation) {
				this.currentLocation = currentLocation;
			}

			public String getDesignation() {
				return designation;
			}

			public void setDesignation(String designation) {
				this.designation = designation;
			}

			public String getQualifications() {
				return qualifications;
			}

			public void setQualifications(String qualifications) {
				this.qualifications = qualifications;
			}

			public String getSpecialization() {
				return specialization;
			}

			public void setSpecialization(String specialization) {
				this.specialization = specialization;
			}

			public String getExperience() {
				return experience;
			}

			public void setExperience(String experience) {
				this.experience = experience;
			}

			public String getResearchInterests() {
				return researchInterests;
			}

			public void setResearchInterests(String researchInterests) {
				this.researchInterests = researchInterests;
			}
		    
		    
		    
}
