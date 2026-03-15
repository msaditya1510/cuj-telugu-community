package com.telugu.cuj.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Pattern;

@Embeddable
public class SocialLinks {

	@Pattern(regexp = "^(https?:\\/\\/)?([\\w\\-]+\\.)?linkedin\\.com\\/.*$", 
            message = "Please provide a valid LinkedIn URL")
	private String linkedin;
	
	@Pattern(regexp = "^(https?:\\/\\/)?([\\w\\-]+\\.)?github\\.com\\/.*$", 
            message = "Please provide a valid GitHub URL")
	private String github;
	
	 @Pattern(regexp = "^(https?:\\/\\/)?([\\w\\-]+\\.)?instagram\\.com\\/.*$", 
             message = "Please provide a valid Instagram URL")
	private String instagram;
	private String x;
	
	public SocialLinks() {
		super();
	}
	public SocialLinks(String linkedin, String github, String instagram, String x) {
		super();
		this.linkedin = linkedin;
		this.github = github;
		this.instagram = instagram;
		this.x = x;
	}
	public String getLinkedin() {
		return linkedin;
	}
	public void setLinkedin(String linkedin) {
		this.linkedin = linkedin;
	}
	public String getGithub() {
		return github;
	}
	public void setGithub(String github) {
		this.github = github;
	}
	public String getInstagram() {
		return instagram;
	}
	public void setInstagram(String instagram) {
		this.instagram = instagram;
	}
	public String getX() {
		return x;
	}
	public void setX(String x) {
		this.x = x;
	}
	
}
