/**
 * 
 */
package com.telugu.cuj.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telugu.cuj.entity.Event;

/**
 * 
 */
@Repository
public interface EventRepo extends JpaRepository<Event, Long> {

	Optional<Event> findByEventName(String eventName);
	
	List<Event> findByEventDateTimeAfterOrderByEventDateTimeAsc(LocalDateTime now);

	List<Event> findByEventDateTimeBeforeOrderByEventDateTimeDesc(LocalDateTime now);

}
