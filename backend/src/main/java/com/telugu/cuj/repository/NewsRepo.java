package com.telugu.cuj.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telugu.cuj.entity.News;

@Repository
public interface NewsRepo extends JpaRepository<News, Long> {

	Optional<News> findByNewsTitle(String newsTitle);
	

}
