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

import com.telugu.cuj.dto.EventRequest;
import com.telugu.cuj.service.EventService;

@RestController
@RequestMapping("/api/admin/events")
@PreAuthorize("hasRole('ADMIN')")
public class AdminEventController {
	
	private final EventService eventService;

	 public AdminEventController(EventService eventService) {
		super();
		this.eventService = eventService;
	}

	 /**
     * method to add events
     * */
    @PostMapping
    public ResponseEntity<?> addNewEvent(@RequestBody EventRequest eventRequest){
    	eventService.addEvent(eventRequest);
    	return ResponseEntity.ok(Map.of("message", "Event added successfully"));
    }
    
    /**
     * method to update events
     * 
     * */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id,@RequestBody EventRequest eventRequest){
    	eventService.updateEvent(id,eventRequest);
    	return ResponseEntity.ok(Map.of("message", "Event updated successfully"));
    }
    
    /**
     * method to delete the events
     * */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id){
    	eventService.deleteEvent(id);
    	return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));
    }
    
}
