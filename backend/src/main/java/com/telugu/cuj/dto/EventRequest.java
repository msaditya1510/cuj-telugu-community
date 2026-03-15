package com.telugu.cuj.dto;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EventRequest {

	@NotBlank
	@Size(min=10,max=100)
	private String eventName;
	
	@NotBlank
	@Size(min=10,max=100)
	private String eventDescription;
	
	@DateTimeFormat
	private LocalDateTime eventDateTime;
	
	@NotBlank
	@Size(min = 3, max = 150)
	private String venue;
	
	
	
	public EventRequest() {
		super();
	}

	public EventRequest(String eventName, String eventDescription, LocalDateTime eventDateTime, String venue) {
		super();
		this.eventName = eventName;
		this.eventDescription = eventDescription;
		this.eventDateTime = eventDateTime;
		this.venue = venue;
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

	public LocalDateTime getEventDateTime() {
		return eventDateTime;
	}

	public void setEventDateTime(LocalDateTime eventDateTime) {
		this.eventDateTime = eventDateTime;
	}	

	public String getVenue() {
		return venue;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}
}
