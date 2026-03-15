package com.telugu.cuj.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;

@Service
public class ImageService {
	
	private final Cloudinary cloudinary;
	
	
	public ImageService(Cloudinary cloudinary) {
		super();
		this.cloudinary = cloudinary;
	}


	public Map upload() {
		cloudinary.uploader();
		return null;
	}

}
