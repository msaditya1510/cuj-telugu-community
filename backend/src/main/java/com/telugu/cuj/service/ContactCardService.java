package com.telugu.cuj.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.telugu.cuj.dto.ContactCardDTO;
import com.telugu.cuj.dto.FullProfileCardDTO;
import com.telugu.cuj.entity.User;
import com.telugu.cuj.entity.User.UserStatus;
import com.telugu.cuj.entity.User.UserType;
import com.telugu.cuj.mapper.DTOMapper;
import com.telugu.cuj.repository.AlumniRepo;
import com.telugu.cuj.repository.ProfessorRepo;
import com.telugu.cuj.repository.StudentRepo;
import com.telugu.cuj.repository.UserRepository;

@Service
public class ContactCardService {

	private final StudentRepo studentRepo;
	private final AlumniRepo alumniRepo;
	private final UserRepository userRepo;
	private final ProfessorRepo professorRepo;
	private final DTOMapper dtoMapper ;


	public ContactCardService(StudentRepo studentRepo, AlumniRepo alumniRepo, ProfessorRepo professorRepo,DTOMapper dtoMapper,UserRepository userRepo) {
		super();
		this.studentRepo = studentRepo;
		this.alumniRepo = alumniRepo;
		this.professorRepo = professorRepo;
		this.dtoMapper=dtoMapper;
		this.userRepo=userRepo;
	}

	public List<ContactCardDTO> getStudentContactCards() {
		List<ContactCardDTO> contactCards=new ArrayList<>();
		studentRepo.findByStatus(UserStatus.ACTIVE).forEach(student->contactCards.add(dtoMapper.toContactCardDTO(student)));;
		return contactCards;
	}
	public List<ContactCardDTO> getProfessorContactCards() {
		List<ContactCardDTO> contactCards=new ArrayList<>();
		professorRepo.findByStatus(UserStatus.ACTIVE).forEach(professor->contactCards.add(dtoMapper.toContactCardDTO(professor)));;
		return contactCards;
	}

	public List<ContactCardDTO> getAlumniContactCards() {
		List<ContactCardDTO> contactCards=new ArrayList<>();
		alumniRepo.findByStatus(UserStatus.ACTIVE).forEach(alumni->contactCards.add(dtoMapper.toContactCardDTO(alumni)));;
		return contactCards;
	}

	public List<ContactCardDTO> getAllApprovedUsersByRole(UserType type) {
		return switch(type) {
		case STUDENT->getStudentContactCards();
		case PROFESSOR -> getProfessorContactCards();
		case ALUMNI -> getAlumniContactCards();
		default->Collections.emptyList();
		};
	}

	public List<ContactCardDTO> getAllApprovedUsers() {
		List<ContactCardDTO> users=new ArrayList<>();
		users.addAll(getStudentContactCards());
		users.addAll(getProfessorContactCards());
		users.addAll(getAlumniContactCards());
		return users;
	}

	public List<ContactCardDTO> getAllApprovedUsersByRoleAndName(UserType type,String name){
		List<ContactCardDTO> users=new ArrayList<>();
		switch(type) {
		case STUDENT ->
		studentRepo.findByStatusAndNameContainingIgnoreCase(UserStatus.ACTIVE, name)
		.forEach(student->users.add(dtoMapper.toContactCardDTO(student)));
		case PROFESSOR ->
		professorRepo.findByStatusAndNameContainingIgnoreCase(UserStatus.ACTIVE, name)
		.forEach(prof->users.add(dtoMapper.toContactCardDTO(prof)));
		case ALUMNI ->
		alumniRepo.findByStatusAndNameContainingIgnoreCase(UserStatus.ACTIVE, name)
		.forEach(alumni->users.add(dtoMapper.toContactCardDTO(alumni)));
		}
		return users;
	}

	public List<ContactCardDTO> getAllApprovedUsersByRoleNameAndDepartment(UserType type, String name,
			String department) {
		List<ContactCardDTO> users=new ArrayList<>();
		switch(type) {
		case STUDENT ->
		studentRepo.findByDepartmentAndStatusAndNameContainingIgnoreCase(
				department, UserStatus.ACTIVE, name)
		.forEach(student->users.add(dtoMapper.toContactCardDTO(student)));
		case PROFESSOR ->
		professorRepo.findByDepartmentAndStatusAndNameContainingIgnoreCase(
				department, UserStatus.ACTIVE, name)
		.forEach(prof->users.add(dtoMapper.toContactCardDTO(prof)));
		case ALUMNI ->
		alumniRepo.findByDepartmentAndStatusAndNameContainingIgnoreCase(
				department, UserStatus.ACTIVE, name)
		.forEach(alumni->users.add(dtoMapper.toContactCardDTO(alumni)));
		default->Collections.emptyList();
		}
		return users;

	}

	public List<ContactCardDTO> getAllApprovedUsersByDepartment(String department) {
		List<ContactCardDTO> users=new ArrayList<>();
		studentRepo.findByDepartmentAndStatus(department,UserStatus.ACTIVE)
		.forEach(student->users.add(dtoMapper.toContactCardDTO(student)));
		alumniRepo.findByDepartmentAndStatus(department,UserStatus.ACTIVE)
		.forEach(alumni->users.add(dtoMapper.toContactCardDTO(alumni)));
		
		professorRepo.findByDepartmentAndStatus(department,UserStatus.ACTIVE)
				.forEach(prof->users.add(dtoMapper.toContactCardDTO(prof)));
		return users;

	}

	public List<ContactCardDTO> getAllApprovedUsersByName(String name) {
		List<ContactCardDTO> users=new ArrayList<>();
		studentRepo.findByStatusAndNameContainingIgnoreCase(UserStatus.ACTIVE,name)
		.forEach(student->users.add(dtoMapper.toContactCardDTO(student)));
		alumniRepo.findByStatusAndNameContainingIgnoreCase(UserStatus.ACTIVE,name)
				.forEach(alumni->users.add(dtoMapper.toContactCardDTO(alumni)));
		professorRepo.findByStatusAndNameContainingIgnoreCase(UserStatus.ACTIVE,name)
		.forEach(prof->users.add(dtoMapper.toContactCardDTO(prof)));
		return users;
	}

	public FullProfileCardDTO getFullProfileCard(Long id) {
		User user=userRepo.findById(id).orElseThrow(
				() -> new RuntimeException("No user found with id: " + id));
		return switch(user.getUserType()) {
		case STUDENT->
		dtoMapper.toFullProfileCardDTO(studentRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("No student found with id: " + id)));
		case PROFESSOR->
		dtoMapper.toFullProfileCardDTO(professorRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("No professor found with id: " + id)));
		case ALUMNI->
		dtoMapper.toFullProfileCardDTO(alumniRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("No alumni found with id: " + id)));
		};

	}

}
