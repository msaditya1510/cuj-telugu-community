package com.telugu.cuj.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.telugu.cuj.dto.ContactCardDTO;
import com.telugu.cuj.dto.FullProfileCardDTO;
import com.telugu.cuj.dto.UserProfileResponse;
import com.telugu.cuj.entity.Alumni;
import com.telugu.cuj.entity.Professor;
import com.telugu.cuj.entity.Student;
import com.telugu.cuj.entity.User;

@Mapper(componentModel = "spring")
public interface DTOMapper {

	@Mapping(source="userName",target="userName")
	@Mapping(source="name",target="name")
	@Mapping(source="preferredName",target="preferredName")
	@Mapping(source="email",target="email")
	@Mapping(source="department",target="department")
	@Mapping(source="photoUrl",target="photoUrl")
	@Mapping(source="bio",target="bio")
	@Mapping(source="userType",target="userType")
	@Mapping(source="socialLinks",target="socialLinks")
	@Mapping(source="role",target="role")
	@Mapping(source="phone",target="phone")
	@Mapping(source="graduationYear",target="graduationYear")
	@Mapping(source="currentStatus",target="currentStatus")
	@Mapping(source="currentCompany",target="currentCompany")
	@Mapping(source="alumniAchievements",target="alumniAchievements")
	@Mapping(source="currentLocation",target="currentLocation")
	UserProfileResponse toUserProfileResponse(Alumni alumni);


	@Mapping(source="userName",target="userName")
	@Mapping(source="name",target="name")
	@Mapping(source="preferredName",target="preferredName")
	@Mapping(source="email",target="email")
	@Mapping(source="department",target="department")
	@Mapping(source="photoUrl",target="photoUrl")
	@Mapping(source="bio",target="bio")
	@Mapping(source="userType",target="userType")
	@Mapping(source="socialLinks",target="socialLinks")
	@Mapping(source="role",target="role")
	@Mapping(source="phone",target="phone")
	@Mapping(source="rollNo",target="rollNo")
	@Mapping(source="course",target="course")
	@Mapping(source="currentYear",target="currentYear")
	@Mapping(source="skills",target="skills")
	@Mapping(source="achievements",target="achievements")
	UserProfileResponse toUserProfileResponse(Student student);



	@Mapping(source="userName",target="userName")
	@Mapping(source="name",target="name")
	@Mapping(source="preferredName",target="preferredName")
	@Mapping(source="email",target="email")
	@Mapping(source="department",target="department")
	@Mapping(source="photoUrl",target="photoUrl")
	@Mapping(source="bio",target="bio")
	@Mapping(source="userType",target="userType")
	@Mapping(source="socialLinks",target="socialLinks")
	@Mapping(source="role",target="role")
	@Mapping(source="phone",target="phone")
	@Mapping(source="designation",target="designation")
	@Mapping(source="qualifications",target="qualifications")
	@Mapping(source="specialization",target="specialization")
	@Mapping(source="experience",target="experience")
	@Mapping(source="researchInterests",target="researchInterests")
	UserProfileResponse toUserProfileResponse(Professor professor);



	@Mapping(source="userName",target="userName")
	@Mapping(source="name",target="name")
	@Mapping(source="preferredName",target="preferredName")
	@Mapping(source="email",target="email")
	@Mapping(source="department",target="department")
	@Mapping(source="photoUrl",target="photoUrl")
	@Mapping(source="bio",target="bio")
	@Mapping(source="userType",target="userType")
	@Mapping(source="socialLinks",target="socialLinks")
	@Mapping(source="role",target="role")
	@Mapping(source="phone",target="phone")
	UserProfileResponse toUserProfileResponse(User user);
	
	
	@Mapping(source="id",target="id")
	@Mapping(source="name",target="name")
	@Mapping(source="preferredName",target="preferredName")
	@Mapping(source="department",target="department")
	@Mapping(source="photoUrl",target="photoUrl")
	@Mapping(source="address",target="address")
	@Mapping(source="userType",target="userType")
	ContactCardDTO toContactCardDTO(User user);

	@Mapping(source="id",target="id")
	@Mapping(source="name",target="name")
	@Mapping(source="preferredName",target="preferredName")
	@Mapping(source="department",target="department")
	@Mapping(source="photoUrl",target="photoUrl")
	@Mapping(source="address",target="address")
	@Mapping(source="userType",target="userType")
	@Mapping(source="bio",target="bio")
	@Mapping(source="email",target="email")
	@Mapping(source="phone",target="phone")
	@Mapping(source="socialLinks",target="socialLinks")
	@Mapping(source="rollNo",target="rollNo")
	@Mapping(source="course",target="course")
	@Mapping(source="currentYear",target="currentYear")
	@Mapping(source="skills",target="skills")
	@Mapping(source="achievements",target="achievements")
	FullProfileCardDTO toFullProfileCardDTO(Student student);

	@Mapping(source="id",target="id")
	@Mapping(source="name",target="name")
	@Mapping(source="preferredName",target="preferredName")
	@Mapping(source="department",target="department")
	@Mapping(source="photoUrl",target="photoUrl")
	@Mapping(source="address",target="address")
	@Mapping(source="userType",target="userType")
	@Mapping(source="bio",target="bio")
	@Mapping(source="email",target="email")
	@Mapping(source="phone",target="phone")
	@Mapping(source="socialLinks",target="socialLinks")
	@Mapping(source="designation",target="designation")
	@Mapping(source="qualifications",target="qualifications")
	@Mapping(source="specialization",target="specialization")
	@Mapping(source="experience",target="experience")
	@Mapping(source="researchInterests",target="researchInterests")
	FullProfileCardDTO toFullProfileCardDTO(Professor professor);

	@Mapping(source="id",target="id")
	@Mapping(source="name",target="name")
	@Mapping(source="preferredName",target="preferredName")
	@Mapping(source="department",target="department")
	@Mapping(source="photoUrl",target="photoUrl")
	@Mapping(source="address",target="address")
	@Mapping(source="userType",target="userType")
	@Mapping(source="bio",target="bio")
	@Mapping(source="email",target="email")
	@Mapping(source="phone",target="phone")
	@Mapping(source="socialLinks",target="socialLinks")
	@Mapping(source="graduationYear",target="graduationYear")
	@Mapping(source="currentStatus",target="currentStatus")
	@Mapping(source="currentCompany",target="currentCompany")
	@Mapping(source="alumniAchievements",target="alumniAchievements")
	@Mapping(source="currentLocation",target="currentLocation")
	FullProfileCardDTO toFullProfileCardDTO(Alumni alumni);
}
