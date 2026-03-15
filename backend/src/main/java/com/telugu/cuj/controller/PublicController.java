package com.telugu.cuj.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.telugu.cuj.service.EventService;
import com.telugu.cuj.service.UserService;

@RestController
@RequestMapping("/public")
public class PublicController {
	
	private final UserService userService;
	private final EventService eventService;
	

	public PublicController(UserService userService,EventService eventService) {
		super();
		this.userService = userService;
		this.eventService = eventService;
	}

	/**
	 * method used to get the statistics
	 * */
	@GetMapping("/stats")
	public ResponseEntity<Map<String, Long>> getUserStats() {
		Map<String, Long> stats=new HashMap<>(userService.getUserStats());
		stats.put("totalEvents", eventService.getEventsCount());
		return ResponseEntity.ok(stats);
	}
}
