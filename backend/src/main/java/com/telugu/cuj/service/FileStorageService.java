package com.telugu.cuj.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class FileStorageService {
	
	private final Cloudinary cloudinary;

	public FileStorageService(Cloudinary cloudinary) {
		super();
		this.cloudinary = cloudinary;
	}
	
		public String uploadProfileImage(MultipartFile file) throws IOException {
			try {
				validateImageFile(file);
				 Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
						"folder","cuj-telugu/profiles",
						"public_id","profile_"+System.currentTimeMillis(),
						"overwrite",false,
						 "resource_type", "image"
//				          "transformation", new Object[] {
//				                ObjectUtils.asMap("width", 500, "height", 500, "crop", "fill"),
//				                ObjectUtils.asMap("quality", "auto")
//				            }
						 )
						);
				 // Return secure URL
		            return uploadResult.get("secure_url").toString();
		            
			} catch (IOException e) {
				throw new IOException("Failed to upload image to cloud storage", e);
			}

		}
		
		

		public String uploadGalleryImage(MultipartFile file) throws IOException {
			try {
				validateImageFile(file);
				 Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
						"folder","cuj-telugu/profiles",
						"public_id","event_"+System.currentTimeMillis(),
						"overwrite",false,
						 "resource_type", "image"
//				          "transformation", new Object[] {
//				                ObjectUtils.asMap("width", 500, "height", 500, "crop", "fill"),
//				                ObjectUtils.asMap("quality", "auto")
//				            }
						 )
						);
				 // Return secure URL
		            return uploadResult.get("secure_url").toString();
		            
			} catch (IOException e) {
				throw new IOException("Failed to upload image to cloud storage", e);
			}

		}
		 private void validateImageFile(MultipartFile file) throws IllegalArgumentException {
		        if (file == null || file.isEmpty()) {
		            throw new IllegalArgumentException("Please select an image file");
		        }

		        // Check file type
		        String contentType = file.getContentType();
		        if (contentType == null || !contentType.startsWith("image/")) {
		            throw new IllegalArgumentException("Only image files are allowed (JPEG, PNG, etc.)");
		        }

		        // Check file size (max 5MB)
		        long maxSize = 5 * 1024 * 1024; // 5MB
		        if (file.getSize() > maxSize) {
		            throw new IllegalArgumentException("Image size must be less than 5MB");
		        }

		        // Check file extension
		        String originalFilename = file.getOriginalFilename();
		        if (originalFilename != null) {
		            String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
		            if (!extension.matches("jpg|jpeg|png|gif|bmp|webp")) {
		                throw new IllegalArgumentException("Unsupported image format. Use JPG, PNG, or GIF");
		            }
		        }
		    }

		    /**
		     * Deletes an image from Cloudinary using its URL
		     */
		    public void deleteImage(String imageUrl) {
		        if (imageUrl == null || imageUrl.isEmpty()) {
		            return;
		        }

		        try {
		            // Extract public ID from URL
		            String publicId = extractPublicId(imageUrl);
		            if (publicId != null) {
		                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
		                System.out.println("Deleted image: " + publicId);
		            }
		        } catch (Exception e) {
		            // Log but don't throw - image deletion failure shouldn't break the app
		            System.err.println("Failed to delete image: " + e.getMessage());
		        }
		    }

		    /**
		     * Extracts public ID from Cloudinary URL
		     */
		    private String extractPublicId(String imageUrl) {
		        try {
		            String[] parts = imageUrl.split("/upload/");
		            if (parts.length > 1) {
		                String pathWithVersion = parts[1];
		                
		                // Remove version prefix (v1234567890/)
		                if (pathWithVersion.startsWith("v")) {
		                    int slashIndex = pathWithVersion.indexOf('/');
		                    if (slashIndex > 0) {
		                        pathWithVersion = pathWithVersion.substring(slashIndex + 1);
		                    }
		                }
		                
		                // Remove file extension
		                int dotIndex = pathWithVersion.lastIndexOf('.');
		                if (dotIndex > 0) {
		                    pathWithVersion = pathWithVersion.substring(0, dotIndex);
		                }
		                
		                return pathWithVersion;
		            }
		        } catch (Exception e) {
		            System.err.println("Could not extract public ID from URL: " + imageUrl);
		        }
		        return null;
		    }

}
