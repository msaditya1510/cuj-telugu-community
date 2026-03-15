package com.telugu.cuj.dto;

import com.telugu.cuj.entity.Address;
import com.telugu.cuj.entity.SocialLinks;
import com.telugu.cuj.entity.User.Role;
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

public class UserProfileResponse {

	@NotBlank
	@Size(min = 2, max = 100)
	private String userName;
	@NotBlank
	@Size(min = 2, max = 100)
    private String name;
	@NotBlank
	@Size(min = 2, max = 100)
    private String preferredName;
	@NotBlank
	@Email
	@Size(max = 255)
    private String email;
	
	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Please provide a valid Indian phone number")
	@NotBlank
	private String phone;
	
	@NotBlank
	@Size(min = 2, max = 100)
    private String department;
    private String photoUrl;
    @NotBlank
	@Size(min = 10, max = 300)
    private String bio;
    @NotNull
    private UserType userType;
    private SocialLinks socialLinks;
    
    @Embedded
    private Address address;
    
    @Enumerated(EnumType.STRING)
    private Role role;
    
 // student specific
	
 	@NotBlank(message = "Roll number is required")
 	@Pattern(regexp = "^[2][0-9]{10}$", message = "Roll number can only contain numbers")
 	private String rollNo; 
 	
 	@NotBlank(message = "Course is required")
     @Size(max = 100, message = "Course name cannot exceed 100 characters")
     private String course;
 	
 	@NotNull(message = "Current year is required")
     @Min(value = 1, message = "Year must be at least 1")
     @Max(value = 5, message = "Year cannot exceed 5")
 	private Integer currentYear;
 	
 	@Size(max = 1000, message = "Skills cannot exceed 1000 characters")
 	private String skills;
 	    
 	@Size(max = 1000, message = "Achievements cannot exceed 1000 characters")
     private String achievements;
 	
 	//professor specific
 	@NotBlank(message = "Designation is required")
     @Size(max = 100, message = "Designation cannot exceed 100 characters")
     private String designation; // Assistant Professor, Associate Professor, Professor, etc.

     @NotBlank(message = "Qualifications are required")
     @Size(max = 500, message = "Qualifications cannot exceed 500 characters")
     private String qualifications; // "Ph.D in Computer Science, M.Tech, B.Tech"

//     @NotBlank(message = "Specialization is required")
     @Size(max = 200, message = "Specialization cannot exceed 200 characters")
     private String specialization; // "Artificial Intelligence, Machine Learning"

     @Size(max = 100, message = "Experience cannot exceed 100 characters")
     private String experience; // "15+ years", "Since 2008"

     @Size(max = 1000, message = "Research interests cannot exceed 1000 characters")
     private String researchInterests;
     
     // alumni specific
     
     @NotNull(message = "Graduation year is required")
     @Min(value = 2000, message = "Graduation year must be from 2000 onwards")
     private Integer graduationYear;

     @NotBlank(message = "Current status is required")
     @Size(max = 200, message = "Current status cannot exceed 200 characters")
     private String currentStatus;

     @Size(max = 100, message = "Current company cannot exceed 100 characters")
     private String currentCompany;

     @Size(max = 1000, message = "Achievements cannot exceed 1000 characters")
     private String alumniAchievements;

     @NotBlank
     private String currentLocation;
    
	public UserProfileResponse() {
		super();
	}

	public UserProfileResponse(@NotBlank @Size(min = 2, max = 100) String userName,
			@NotBlank @Size(min = 2, max = 100) String name, @NotBlank @Size(min = 2, max = 100) String preferredName,
			@NotBlank @Email @Size(max = 255) String email,
			@Pattern(regexp = "^[6-9]\\d{9}$", message = "Please provide a valid Indian phone number") @NotBlank String phone,
			@NotBlank @Size(min = 2, max = 100) String department, String photoUrl,
			@NotBlank @Size(min = 10, max = 300) String bio, @NotNull UserType userType, SocialLinks socialLinks,
			Address address, Role role,
			@NotBlank(message = "Roll number is required") @Pattern(regexp = "^[2][0-9]{10}$", message = "Roll number can only contain numbers") String rollNo,
			@NotBlank(message = "Course is required") @Size(max = 100, message = "Course name cannot exceed 100 characters") String course,
			@NotNull(message = "Current year is required") @Min(value = 1, message = "Year must be at least 1") @Max(value = 5, message = "Year cannot exceed 5") Integer currentYear,
			@Size(max = 1000, message = "Skills cannot exceed 1000 characters") String skills,
			@Size(max = 1000, message = "Achievements cannot exceed 1000 characters") String achievements,
			@NotBlank(message = "Designation is required") @Size(max = 100, message = "Designation cannot exceed 100 characters") String designation,
			@NotBlank(message = "Qualifications are required") @Size(max = 500, message = "Qualifications cannot exceed 500 characters") String qualifications,
			@NotBlank(message = "Specialization is required") @Size(max = 200, message = "Specialization cannot exceed 200 characters") String specialization,
			@Size(max = 100, message = "Experience cannot exceed 100 characters") String experience,
			@Size(max = 1000, message = "Research interests cannot exceed 1000 characters") String researchInterests,
			@NotNull(message = "Graduation year is required") @Min(value = 2000, message = "Graduation year must be from 2000 onwards") Integer graduationYear,
			@NotBlank(message = "Current status is required") @Size(max = 200, message = "Current status cannot exceed 200 characters") String currentStatus,
			@Size(max = 100, message = "Current company cannot exceed 100 characters") String currentCompany,
			@Size(max = 1000, message = "Achievements cannot exceed 1000 characters") String alumniAchievements,
			@NotBlank String currentLocation) {
		super();
		this.userName = userName;
		this.name = name;
		this.preferredName = preferredName;
		this.email = email;
		this.phone = phone;
		this.department = department;
		this.photoUrl = photoUrl;
		this.bio = bio;
		this.userType = userType;
		this.socialLinks = socialLinks;
		this.address = address;
		this.role = role;
		this.rollNo = rollNo;
		this.course = course;
		this.currentYear = currentYear;
		this.skills = skills;
		this.achievements = achievements;
		this.designation = designation;
		this.qualifications = qualifications;
		this.specialization = specialization;
		this.experience = experience;
		this.researchInterests = researchInterests;
		this.graduationYear = graduationYear;
		this.currentStatus = currentStatus;
		this.currentCompany = currentCompany;
		this.alumniAchievements = alumniAchievements;
		this.currentLocation = currentLocation;
	}

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
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
	public UserType getUserType() {
		return userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	public SocialLinks getSocialLinks() {
		return socialLinks;
	}
	public void setSocialLinks(SocialLinks socialLinks) {
		this.socialLinks = socialLinks;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
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

	public String getAchievements() {
		return achievements;
	}

	public void setAchievements(String achievements) {
		this.achievements = achievements;
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
    
	
    
}
