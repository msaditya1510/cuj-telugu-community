package com.telugu.cuj.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Embeddable
public class Address {
	
	@NotBlank(message = "City is required")
    @Size(max = 50, message = "City cannot exceed 50 characters")
	private String city;
	
	@NotBlank(message = "State is required")
    @Size(max = 50, message = "State cannot exceed 50 characters")
	private String state;
	
	@NotBlank(message = "District is required")
    @Size(max = 50, message = "District cannot exceed 50 characters")
	private String district;
	
	@Pattern(regexp = "^[1-9][0-9]{5}$", message = "Please provide a valid 6-digit pincode")
	private String pincode;
	
	public Address(String city, String state, String district,String pincode) {
		super();
		this.city = city;
		this.state = state;
		this.district = district;
		this.pincode=pincode;
	}
	
	public Address() {
		super();
	}
	
	
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	
	
	
}
