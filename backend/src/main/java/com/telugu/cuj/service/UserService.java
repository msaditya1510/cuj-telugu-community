package com.telugu.cuj.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.telugu.cuj.dto.RegisterRequest;
import com.telugu.cuj.dto.UserProfileResponse;
import com.telugu.cuj.entity.Address;
import com.telugu.cuj.entity.Alumni;
import com.telugu.cuj.entity.Professor;
import com.telugu.cuj.entity.Student;
import com.telugu.cuj.entity.User;
import com.telugu.cuj.entity.User.Role;
import com.telugu.cuj.entity.User.UserStatus;
import com.telugu.cuj.entity.User.UserType;
import com.telugu.cuj.mapper.DTOMapper;
import com.telugu.cuj.mapper.RegisterMapper;
import com.telugu.cuj.repository.AlumniRepo;
import com.telugu.cuj.repository.ProfessorRepo;
import com.telugu.cuj.repository.StudentRepo;
import com.telugu.cuj.repository.UserRepository;

import tools.jackson.databind.ObjectMapper;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final StudentRepo studentRepo;
	private final ProfessorRepo professorRepo;
	private final AlumniRepo alumniRepo;
	private final RegisterMapper mapper;
	private final DTOMapper dtoMapper;
	private final FileStorageService fileStorageService;
	private final PasswordEncoder passwordEncoder;

	/**
	 * parameterized constructor
	 * */
	public UserService(UserRepository userRepository, StudentRepo studentRepo, ProfessorRepo professorRepo,
			AlumniRepo alumniRepo,RegisterMapper mapper, FileStorageService fileStorageService,PasswordEncoder passwordEncoder,DTOMapper dtoMapper) {
		super();
		this.userRepository = userRepository;
		this.studentRepo = studentRepo;
		this.professorRepo = professorRepo;
		this.alumniRepo = alumniRepo;
		this.mapper = mapper;
		this.fileStorageService=fileStorageService;
		this.passwordEncoder=passwordEncoder;
		this.dtoMapper=dtoMapper;
	}

	/**
     * method used to register new user
     *
     */
	public void registerUser(String userDataJson, MultipartFile file) {
		ObjectMapper objectMapper = new ObjectMapper();
		RegisterRequest req = objectMapper.readValue(userDataJson, RegisterRequest.class);
		validateUserCreation(req);
		String photoUrl = null;
		if(file!=null&&!file.isEmpty()) {
			try {
				photoUrl = fileStorageService.uploadProfileImage(file);
				System.out.println("Profile image uploaded to cloud: " + photoUrl);
			} catch (IOException e) {
				throw new RuntimeException("Failed to upload profile image: " + e.getMessage());
			} catch (IllegalArgumentException e) {
				throw new RuntimeException("Invalid profile image: " + e.getMessage());
			}
		} else {
			System.out.println("No profile image provided, creating user without photo");
		}

		// Create user entity with or without photo URL
        createUserEntity(req, photoUrl);
    }

	/**
     * helper method for registering the user
     *
     */
	private void createUserEntity(RegisterRequest req, String photoUrl) {
		UserType type = req.getUserType();
        switch (type) {
            case STUDENT -> {
                Student student = mapper.toStudent(req);
                student.setFieldsAfterRegistration();
                student.setPhotoUrl(photoUrl);  // Can be null
                student.setPasswordHash(passwordEncoder.encode(req.getPassword()));
                studentRepo.save(student);
            }
            case PROFESSOR -> {
                Professor professor = mapper.toProfessor(req);
                professor.setFieldsAfterRegistration();
                professor.setPhotoUrl(photoUrl);  // Can be null
                professor.setPasswordHash(passwordEncoder.encode(req.getPassword()));
                professorRepo.save(professor);
            }
            case ALUMNI -> {
                Alumni alumni = mapper.toAlumni(req);
                alumni.setFieldsAfterRegistration();
                alumni.setPhotoUrl(photoUrl);  // Can be null
                alumni.setPasswordHash(passwordEncoder.encode(req.getPassword()));
                alumniRepo.save(alumni);
            }
            default -> throw new IllegalArgumentException("Invalid role: " + type);
        }
    }

	/**
	 * method used to get user by id
	 * */
	public User getUserById(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + id));
	}

	/**
	 * method used to get user by username
	 * */
	public User getUserByUserName(String username) {
		return userRepository.findByUserName(username)
				.orElseThrow(() -> new RuntimeException("User not found with user name: " + username));
	}
	
	/**
	 * method used to get user profile with using username
	 * */
	public UserProfileResponse getUserProfile(String userName) {
		User user=userRepository.findByUserName(userName)
				.orElseThrow(() -> new RuntimeException("User not found with username: " + userName));

	    if (user.getStatus() != UserStatus.ACTIVE) {
	        throw new AccessDeniedException("Account not active");
	    }
	    
	    if(user.getRole()==Role.ADMIN) {
	    	return dtoMapper.toUserProfileResponse(user);
	    }
	    
	    return switch(user.getUserType()) {
	    	case STUDENT-> dtoMapper.toUserProfileResponse(studentRepo.findById(user.getId()).get());
	    	case PROFESSOR->dtoMapper.toUserProfileResponse(professorRepo.findById(user.getId()).get());
	    	case ALUMNI->dtoMapper.toUserProfileResponse(alumniRepo.findById(user.getId()).get());
	    };
	}

	/**
	 * method used to cross-check the required details while registering a user.
	 * */
	private void validateUserCreation(RegisterRequest user) {
		if (userRepository.existsByUserName(user.getUserName())) {
			throw new RuntimeException("Username already exists: " + user.getUserName());
		}
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new RuntimeException("Email already exists: " + user.getEmail());
		}
		if (user.getPhone() != null && userRepository.existsByPhone(user.getPhone())) {
			throw new RuntimeException("Phone number already exists: " + user.getPhone());
		}
		if (user.getName() != null && userRepository.existsByName(user.getName())) {
			throw new RuntimeException("A user already exists with name: " + user.getName());
		}
	}

	/**
	 * method used to get all approved users
	 * */
	public List<User> getAllUsers(Pageable pageable) {
		userRepository.findByStatus(UserStatus.ACTIVE,pageable);
		return null;
	}

	/**
	 * method used to get the user statistics
	 * */
	public Map<String, Long> getUserStats() {
		return Map.of(
//				"totalUsers", (long) userRepository.findAll().size(),
				"totalStudents", (long)userRepository.findUserByUserType(UserType.STUDENT).size(),
				"totalProfessors", (long)userRepository.findUserByUserType(UserType.PROFESSOR).size(),
				"totalAlumni", (long)userRepository.findUserByUserType(UserType.ALUMNI).size()
				//			            "pendingApprovals", userService.getPendingApprovalsCount()
				);
	}

	/**
	 * method used to check if the given username is free to use or not
	 * */
	public boolean isUserNameAvailable(String userName) {
		return userRepository.findByUserName(userName).isEmpty();

	}

	/**
	 * method used to update the user profile
	 * @deprecated
	 * */
	public void updateProfile(String username, String req, MultipartFile file) {

	    try {

	        ObjectMapper objectMapper = new ObjectMapper();
	        RegisterRequest dto = objectMapper.readValue(req, RegisterRequest.class);

	        User existingUser = getUserByUserName(username);

	        if (existingUser.getStatus() != UserStatus.ACTIVE) {
	            throw new AccessDeniedException("Account not active");
	        }

	        /* ================= PROFILE IMAGE ================= */

	        String photoUrl = existingUser.getPhotoUrl();

	        if (file != null && !file.isEmpty()) {

	            String newPhotoUrl = fileStorageService.uploadProfileImage(file);

	            if (photoUrl != null && !photoUrl.isEmpty()) {
	                fileStorageService.deleteImage(photoUrl);
	            }

	            photoUrl = newPhotoUrl;
	        }

	        existingUser.setPhotoUrl(photoUrl);

	        /* ================= COMMON FIELDS ================= */

	        existingUser.setPreferredName(dto.getPreferredName());
	        existingUser.setBio(dto.getBio());
	        existingUser.setPhone(dto.getPhone());
	        existingUser.setSocialLinks(dto.getSocialLinks());
	        existingUser.setAddress(dto.getAddress());

	        /* ================= ROLE SPECIFIC ================= */

	        switch (existingUser.getUserType()) {

	            case STUDENT -> {

	                Student student = (Student) existingUser;

	                student.setSkills(dto.getSkills());
	                student.setAchievements(dto.getStudentAchievements());

	                studentRepo.save(student);
	            }

	            case PROFESSOR -> {

	                Professor professor = (Professor) existingUser;

	                professor.setQualifications(dto.getQualifications());
	                professor.setSpecialization(dto.getSpecialization());
	                professor.setExperience(dto.getExperience());
	                professor.setResearchInterests(dto.getResearchInterests());

	                professorRepo.save(professor);
	            }

	            case ALUMNI -> {

	                Alumni alumni = (Alumni) existingUser;

	                alumni.setCurrentCompany(dto.getCurrentCompany());
	                alumni.setCurrentStatus(dto.getCurrentStatus());
	                alumni.setCurrentLocation(dto.getCurrentLocation());
	                alumni.setAlumniAchievements(dto.getAlumniAchievements());

	                alumniRepo.save(alumni);
	            }

	            default -> throw new IllegalArgumentException("Invalid role");
	        }

	    } catch (Exception e) {

	        throw new RuntimeException("Failed to update profile: " + e.getMessage());
	    }
	}

	public void updateProfileData(String username, RegisterRequest req) {

    User existingUser = getUserByUserName(username);

    if (existingUser.getStatus() != UserStatus.ACTIVE) {
        throw new AccessDeniedException("Account not active");
    }

    existingUser.setSocialLinks(req.getSocialLinks());
    
    UserType type = existingUser.getUserType();

    switch (type) {

        case STUDENT -> {

            Student student = studentRepo.findById(existingUser.getId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            student.setName(req.getName());
            student.setPreferredName(req.getPreferredName());
            student.setEmail(req.getEmail());
            student.setPhone(req.getPhone());
            student.setDepartment(req.getDepartment());
            student.setBio(req.getBio());

            if (req.getAddress() != null) {

                if (student.getAddress() == null) {
                    student.setAddress(new Address());
                }

                student.getAddress().setCity(req.getAddress().getCity());
                student.getAddress().setDistrict(req.getAddress().getDistrict());
                student.getAddress().setState(req.getAddress().getState());
                student.getAddress().setPincode(req.getAddress().getPincode());
            }

            student.setCourse(req.getCourse());
            student.setCurrentYear(req.getCurrentYear());
            student.setSkills(req.getSkills());
            student.setAchievements(req.getStudentAchievements());
            student.setSocialLinks(req.getSocialLinks());
            studentRepo.save(student);
        }

        case PROFESSOR -> {

            Professor professor = professorRepo.findById(existingUser.getId())
                    .orElseThrow(() -> new RuntimeException("Professor not found"));

            professor.setName(req.getName());
            professor.setPreferredName(req.getPreferredName());
            professor.setEmail(req.getEmail());
            professor.setPhone(req.getPhone());
            professor.setDepartment(req.getDepartment());
            professor.setBio(req.getBio());

            if (req.getAddress() != null) {

                if (professor.getAddress() == null) {
                    professor.setAddress(new Address());
                }

                professor.getAddress().setCity(req.getAddress().getCity());
                professor.getAddress().setDistrict(req.getAddress().getDistrict());
                professor.getAddress().setState(req.getAddress().getState());
                professor.getAddress().setPincode(req.getAddress().getPincode());
            }

            professor.setDesignation(req.getDesignation());
            professor.setQualifications(req.getQualifications());
            professor.setSpecialization(req.getSpecialization());
            professor.setExperience(req.getExperience());
            professor.setResearchInterests(req.getResearchInterests());
            professor.setSocialLinks(req.getSocialLinks());
            professorRepo.save(professor);
        }

        case ALUMNI -> {

            Alumni alumni = alumniRepo.findById(existingUser.getId())
                    .orElseThrow(() -> new RuntimeException("Alumni not found"));

            alumni.setName(req.getName());
            alumni.setPreferredName(req.getPreferredName());
            alumni.setEmail(req.getEmail());
            alumni.setPhone(req.getPhone());
            alumni.setDepartment(req.getDepartment());
            alumni.setBio(req.getBio());

            if (req.getAddress() != null) {

                if (alumni.getAddress() == null) {
                    alumni.setAddress(new Address());
                }

                alumni.getAddress().setCity(req.getAddress().getCity());
                alumni.getAddress().setDistrict(req.getAddress().getDistrict());
                alumni.getAddress().setState(req.getAddress().getState());
                alumni.getAddress().setPincode(req.getAddress().getPincode());
            }

            alumni.setGraduationYear(req.getGraduationYear());
            alumni.setCurrentCompany(req.getCurrentCompany());
            alumni.setCurrentStatus(req.getCurrentStatus());
            alumni.setCurrentLocation(req.getCurrentLocation());
            alumni.setAlumniAchievements(req.getAlumniAchievements());
            alumni.setSocialLinks(req.getSocialLinks());
            alumniRepo.save(alumni);
        }

        default -> throw new IllegalArgumentException("Invalid role: " + type);
    }
}
	public void updateProfilePhoto(String username, MultipartFile file) {

    if (file == null || file.isEmpty()) {
        throw new IllegalArgumentException("Photo file is required");
    }

    User existingUser = getUserByUserName(username);

    if (existingUser.getStatus() != UserStatus.ACTIVE) {
        throw new AccessDeniedException("Account not active");
    }

    String existingPhotoUrl = existingUser.getPhotoUrl();
    String newPhotoUrl;

    try {

        newPhotoUrl = fileStorageService.uploadProfileImage(file);

        if (existingPhotoUrl != null && !existingPhotoUrl.isEmpty()) {
            fileStorageService.deleteImage(existingPhotoUrl);
        }

    } catch (IOException e) {
        throw new RuntimeException("Failed to upload profile image: " + e.getMessage());
    }

    UserType type = existingUser.getUserType();

    switch (type) {

        case STUDENT -> {

            Student student = studentRepo.findById(existingUser.getId())
                    .orElseThrow();

            student.setPhotoUrl(newPhotoUrl);
            studentRepo.save(student);
        }

        case PROFESSOR -> {

            Professor professor = professorRepo.findById(existingUser.getId())
                    .orElseThrow();

            professor.setPhotoUrl(newPhotoUrl);
            professorRepo.save(professor);
        }

        case ALUMNI -> {

            Alumni alumni = alumniRepo.findById(existingUser.getId())
                    .orElseThrow();

            alumni.setPhotoUrl(newPhotoUrl);
            alumniRepo.save(alumni);
        }

        default -> throw new IllegalArgumentException("Invalid role: " + type);
    }
}


}
