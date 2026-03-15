package com.telugu.cuj.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.EqualsAndHashCode;

@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "students")
public class Student extends User {

	@NotBlank(message = "Roll number is required")
	@Pattern(regexp = "^[2][0-9]{10}$", message = "Roll number can only contain numbers")
	@Column(unique = true)
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

	
	public Student() {
		super();
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
	
}
