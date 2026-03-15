package com.telugu.cuj.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class NewsRequest {

	@NotBlank
	@Size(min = 3, max = 100)
	private String newsTitle;
	@NotBlank
	@Size(min = 10, max = 100)
    private String newsDescription;
	
	@NotBlank
	@Size(min = 3, max = 100)
    private String newsType;
	
	@NotBlank
    private LocalDateTime date;
    
	public NewsRequest() {
		super();
	}

	public NewsRequest(String newsTitle, String newsDescription, String newsType,LocalDateTime date) {
		super();
		this.newsTitle = newsTitle;
		this.newsDescription = newsDescription;
		this.newsType = newsType;
		this.date=date;
	}

	public String getNewsTitle() {
		return newsTitle;
	}

	public void setNewsTitle(String newsTitle) {
		this.newsTitle = newsTitle;
	}

	public String getNewsDescription() {
		return newsDescription;
	}

	public void setNewsDescription(String newsDescription) {
		this.newsDescription = newsDescription;
	}

	public String getNewsType() {
		return newsType;
	}

	public void setNewsType(String newsType) {
		this.newsType = newsType;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	
}
