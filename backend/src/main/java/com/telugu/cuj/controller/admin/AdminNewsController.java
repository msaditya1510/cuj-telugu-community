package com.telugu.cuj.controller.admin;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.telugu.cuj.dto.NewsRequest;
import com.telugu.cuj.service.NewsService;

@RestController
@RequestMapping("/api/admin/news")
@PreAuthorize("hasRole('ADMIN')")
public class AdminNewsController {

	private final NewsService newsService;

	public AdminNewsController(NewsService newsService) {
		super();
		this.newsService = newsService;
	}

	/**
	 * method to add new news
	 * */
	@PostMapping
	public ResponseEntity<?> addNewNews(@RequestBody NewsRequest newsRequest){
		newsService.addNews(newsRequest);
		return ResponseEntity.ok(Map.of("message", "News added successfully"));
	}

	/**
	 * method to update existing news
	 * */
	@PutMapping("/{id}")
	public ResponseEntity<?> updateNews(@PathVariable Long id,@RequestBody NewsRequest newsRequest){
		newsService.updateNews(id,newsRequest);
		return ResponseEntity.ok(Map.of("message", "news updated successfully"));
	}

	/**
	 * method to delete the existing news
	 * */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteNews(@PathVariable Long id){
		newsService.deleteNews(id);
		return ResponseEntity.ok(Map.of("message", "news deleted successfully"));
	}
}
