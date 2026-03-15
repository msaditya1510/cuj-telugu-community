package com.telugu.cuj.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name="professors")
@Data
public class Professor extends User {

    @NotBlank(message = "Designation is required")
    @Size(max = 100, message = "Designation cannot exceed 100 characters")
    private String designation; // Assistant Professor, Associate Professor, Professor, etc.

    @NotBlank(message = "Qualifications are required")
    @Size(max = 500, message = "Qualifications cannot exceed 500 characters")
    private String qualifications; // "Ph.D in Computer Science, M.Tech, B.Tech"

//    @NotBlank(message = "Specialization is required")
    @Size(max = 200, message = "Specialization cannot exceed 200 characters")
    private String specialization; // "Artificial Intelligence, Machine Learning"

    @Size(max = 100, message = "Experience cannot exceed 100 characters")
    private String experience; // "15+ years", "Since 2008"

    @Size(max = 1000, message = "Research interests cannot exceed 1000 characters")
    private String researchInterests;

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
