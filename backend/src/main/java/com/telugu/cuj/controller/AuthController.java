package com.telugu.cuj.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.telugu.cuj.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final UserService userService;


	public AuthController(UserService userService) {
		super();
		this.userService = userService;
	}

	/**
	 * method used to register a new user.
	 * */
	@PostMapping(value="/register",consumes = {"multipart/form-data"})
	public ResponseEntity<?> registerUser(
			@RequestParam("userData") String userDataJson,  // Accept as String
			@RequestParam(value = "file", required = false) MultipartFile file) {

		try {
			userService.registerUser(userDataJson, file);
			return ResponseEntity.ok(Map.of("message","user registered successfully"));
		} catch (Exception e) {
			throw new RuntimeException("Failed to process registration: " + e.getMessage());
		}
	}

	/**
	 * To check if the username exists in the database part of registration process.
	 * Need to change it to the registrationController.
	 * */
	@GetMapping("/check-username")
	public Map<String,Boolean> isUserNameAvailable(@RequestParam("username") String userName){
		System.out.println("username check!");
		return Map.of("available",userService.isUserNameAvailable(userName)); 

	}
}
