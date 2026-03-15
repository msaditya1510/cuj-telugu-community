package com.telugu.cuj.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name="alumni")
@Data
public class Alumni extends User {
	
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

	    private String currentLocation;

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
