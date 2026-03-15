package com.telugu.cuj.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.telugu.cuj.dto.NewsRequest;
import com.telugu.cuj.entity.News;
import com.telugu.cuj.repository.NewsRepo;

@Service
public class NewsService {

	private final NewsRepo newsRepo;

	public NewsService(NewsRepo newsRepo) {
		super();
		this.newsRepo = newsRepo;
	}

	public News getNewsById(Long id) {
		News news=newsRepo.findById(id).orElseThrow(() -> new RuntimeException("No news found with id: " + id));
		return news;
	}

	public List<NewsRequest> getAllNews() {
		return newsRepo.findAll().stream().map(news->{
			return new NewsRequest(news.getNewsTitle(),news.getNewsDescription(),news.getNewsType(),news.getPostedOn());
		}).toList();
	}

	public void addNews(NewsRequest newsRequest) {
		Optional<News> OldNews=newsRepo.findByNewsTitle(newsRequest.getNewsTitle());
		if(OldNews.isPresent()) {
			throw new RuntimeException("News with title "+newsRequest.getNewsTitle()+" already exists!");
		}
		else {
			News news=new News();
			news.setAll(newsRequest);
			newsRepo.save(news);
		}
	}

	public void updateNews(Long id, NewsRequest newsRequest) {
		News OldNews=newsRepo.findById(id).orElseThrow(() -> new RuntimeException("No news found with id: " + id));
		OldNews.setAll(newsRequest);
		newsRepo.save(OldNews);

	}

	public void deleteNews(Long id) {
		News news=newsRepo.findById(id).orElseThrow(() -> new RuntimeException("No news found with id: " + id));
		newsRepo.delete(news);
	}
}
