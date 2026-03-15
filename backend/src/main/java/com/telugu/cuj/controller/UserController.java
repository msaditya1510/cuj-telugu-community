package com.telugu.cuj.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.telugu.cuj.dto.RegisterRequest;
import com.telugu.cuj.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}


	/**	
	 * method used to fetch user details after the login.
	 **/
	@GetMapping("/me")
	public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {

	    if (userDetails == null) {
	        return ResponseEntity.status(401).build();
	    }

	    return ResponseEntity.ok(
	        userService.getUserProfile(userDetails.getUsername())
	    );
	}
	
	/**
	 * method to update only user profile no photo - only after the login
	 **/
	@PutMapping("/me")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Map<String,String>> updateProfile(
	        @AuthenticationPrincipal UserDetails userDetails,
	        @RequestBody RegisterRequest req) {

	    userService.updateProfileData(userDetails.getUsername(), req);

	    return ResponseEntity.ok(Map.of("message","Profile updated"));
	}
	
	/**
	 * method to update the user profile photo - only after the login
	 **/
	@PutMapping(value="/me/photo", consumes = {"multipart/form-data"})
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Map<String,String>> updatePhoto(
	        @AuthenticationPrincipal UserDetails userDetails,
	        @RequestPart("file") MultipartFile file) {

	    userService.updateProfilePhoto(userDetails.getUsername(), file);

	    return ResponseEntity.ok(Map.of("message","Photo updated"));
	}

}
