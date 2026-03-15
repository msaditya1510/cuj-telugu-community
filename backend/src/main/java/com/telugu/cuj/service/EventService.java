package com.telugu.cuj.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.telugu.cuj.dto.EventRequest;
import com.telugu.cuj.entity.Event;
import com.telugu.cuj.repository.EventRepo;

@Service
public class EventService {
	
	private EventRepo eventRepo;
	
	public EventService(EventRepo eventRepo) {
		super();
		this.eventRepo = eventRepo;
	}

	public List<?> getAllEvents(){
		return eventRepo.findAll();
	}
	
	public Long getEventsCount() {
		return (long)eventRepo.findAll().size();
	}

	public Event getEventByName(String eventName) {
		return eventRepo.findByEventName(eventName)
				.orElseThrow(() -> new RuntimeException("Event not found with name: " + eventName));
	}

	public Event addEvent(EventRequest eventRequest) {
		Event event=new Event();
		event.setAll(eventRequest);
		return eventRepo.save(event);
		
	}

	public void updateEvent(Long id, EventRequest eventRequest) {
		Event event=new Event();
		event.setAll(eventRequest);
		Event orgEvent=eventRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
		if(orgEvent.getEventName().equals(event.getEventName())) {
			orgEvent.setAll(event);
			eventRepo.save(orgEvent);
			return;
		}
		throw new RuntimeException("Event is mismatching with the records!");
		
	}

	public void deleteEvent(Long id) {
		Event event=eventRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
		eventRepo.delete(event);
	}

	public Event getEventById(Long id) {
		Event event=eventRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
		return event;
		
	}

	public List<Event> getUpcomingEvents() {
	    return eventRepo
	        .findByEventDateTimeAfterOrderByEventDateTimeAsc(LocalDateTime.now());
	}

	public List<Event> getPastEvents() {
	    return eventRepo
	        .findByEventDateTimeBeforeOrderByEventDateTimeDesc(LocalDateTime.now());
	}
	
}
