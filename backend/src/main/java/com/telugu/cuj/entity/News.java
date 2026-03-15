package com.telugu.cuj.entity;

import java.time.LocalDateTime;

import com.telugu.cuj.dto.NewsRequest;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "news")
public class News {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String newsTitle;
	@NotBlank
	private String newsDescription;
	@NotBlank
	private String newsType;
	private LocalDateTime postedOn;
	
	public News(String newsTitle, String newsDescription, String newsType, LocalDateTime postedOn) {
		super();
		this.newsTitle = newsTitle;
		this.newsDescription = newsDescription;
		this.newsType = newsType;
		this.postedOn = LocalDateTime.now();
	}

	public News() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public LocalDateTime getPostedOn() {
		return postedOn;
	}

	public void setPostedOn(LocalDateTime postedOn) {
		this.postedOn = postedOn;
	}
	
	public void setAll(News news) {
		this.newsTitle=news.newsTitle;
		this.newsDescription = news.newsDescription;
		this.newsType = news.newsType;
		this.postedOn = LocalDateTime.now();
	}
	public void setAll(NewsRequest newsRequest) {
		this.newsTitle=newsRequest.getNewsTitle();
		this.newsDescription = newsRequest.getNewsDescription();
		this.newsType = newsRequest.getNewsType();
		this.postedOn = LocalDateTime.now();
	}
}
