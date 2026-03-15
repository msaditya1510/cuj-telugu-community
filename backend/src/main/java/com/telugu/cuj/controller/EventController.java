package com.telugu.cuj.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.telugu.cuj.entity.Event;
import com.telugu.cuj.service.EventService;

@RestController
@RequestMapping("/api/events")
public class EventController {
	
	private EventService eventService;
	
	public EventController(EventService eventService) {
		super();
		this.eventService = eventService;
	}
	
	@GetMapping("/upcoming")
	public List<Event> upcomingEvents() {
	    return eventService.getUpcomingEvents();
	}

	@GetMapping("/past")
	public List<Event> pastEvents() {
	    return eventService.getPastEvents();
	}
	
	@GetMapping
	public ResponseEntity<List<?>> getAllEvents(){
		return ResponseEntity.ok(eventService.getAllEvents());
	}
	
	
	@GetMapping("/{id}")
	public Event getEventById(@PathVariable Long id) {
		return eventService.getEventById(id);
	}
	

}
