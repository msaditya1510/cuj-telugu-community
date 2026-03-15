package com.telugu.cuj.entity;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.telugu.cuj.dto.EventRequest;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message="Event name is required")
	private String eventName; // eventName
	@Size(max = 300,message="Description cannot exceed 300 words!")
	private String eventDescription; // description of the event
	
	@DateTimeFormat
	private LocalDateTime eventDateTime; // date & time of the event

	@NotBlank(message="Venue of the event is required")
	private String venue;
	
	
	private LocalDateTime postedOn; // posted date
	
	public Event() {
		postedOn=LocalDateTime.now();
	}
	
	public Event(Long id, String eventName, String eventDescription, LocalDateTime eventDateTime,
			String venue, LocalDateTime postedOn) {
		super();
		this.id = id;
		this.eventName = eventName;
		this.eventDescription = eventDescription;
		this.eventDateTime = eventDateTime;
		this.venue = venue;
		this.postedOn = LocalDateTime.now();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}
	public String getEventDescription() {
		return eventDescription;
	}
	public void setEventDescription(String eventDescription) {
		this.eventDescription = eventDescription;
	}
	
	public void setEventDateTime(LocalDateTime eventDateTime) {
		this.eventDateTime = eventDateTime;
	}
	public LocalDateTime getEventDateTime() {
		return eventDateTime;
	}
	
	public String getVenue() {
		return venue;
	}
	public void setVenue(String venue) {
		this.venue = venue;
	}
	public LocalDateTime getPostedOn() {
		return postedOn;
	}
	public void setPostedOn(LocalDateTime postedOn) {
		this.postedOn = postedOn;
	}
	public void setAll(Event e) {
		eventName=e.eventName;
		eventDescription=e.eventDescription;
		venue=e.venue;
		eventDateTime=e.eventDateTime;
		postedOn=LocalDateTime.now();
	}
	public void setAll(EventRequest e) {
		eventName=e.getEventName();
		eventDescription=e.getEventDescription();
		venue=e.getVenue();
		eventDateTime=e.getEventDateTime();
		postedOn=LocalDateTime.now();
	}
}
