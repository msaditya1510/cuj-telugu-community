// File: src/main/java/com/telugu/cuj/controller/ImageController.java
package com.telugu.cuj.controller;

import com.telugu.cuj.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@CrossOrigin("*")
public class ImageController {

    private final FileStorageService fileStorageService;

    public ImageController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    /**
     * Upload a profile image (can be used during registration)
     */
    @PostMapping("/upload-profile")
    public ResponseEntity<Map<String, Object>> uploadProfileImage(@RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Upload to Cloudinary
            String imageUrl = fileStorageService.uploadProfileImage(file);
            
            response.put("success", true);
            response.put("message", "Profile image uploaded successfully");
            response.put("url", imageUrl);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to upload image: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Upload multiple images (for future use - gallery, posts, etc.)
     */
    @PostMapping("/upload-multiple")
    public ResponseEntity<Map<String, Object>> uploadMultipleImages(@RequestParam("files") MultipartFile[] files) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<String, String> uploadedUrls = new HashMap<>();
            
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String url = fileStorageService.uploadProfileImage(file);
                    uploadedUrls.put(file.getOriginalFilename(), url);
                }
            }
            
            response.put("success", true);
            response.put("message", "Files uploaded successfully");
            response.put("urls", uploadedUrls);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to upload images: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}