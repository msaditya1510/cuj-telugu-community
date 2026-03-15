package com.telugu.cuj.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.telugu.cuj.dto.NewsRequest;
import com.telugu.cuj.entity.News;
import com.telugu.cuj.service.NewsService;

@RestController
@RequestMapping("/api/news")
public class NewsController {
	
	private final NewsService newsService;

	
	public NewsController(NewsService newsService) {
		super();
		this.newsService = newsService;
	}

	@GetMapping("/{id}")
	public News getNewsById(@PathVariable Long id) {
		return newsService.getNewsById(id);
	}
	
	@GetMapping
	public List<NewsRequest> getAllNews(){
		return newsService.getAllNews();
	}
}
