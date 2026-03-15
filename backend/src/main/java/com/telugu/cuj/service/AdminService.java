package com.telugu.cuj.service;


import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.telugu.cuj.dto.AdminUserResponse;
import com.telugu.cuj.entity.User;
import com.telugu.cuj.entity.User.Role;
import com.telugu.cuj.entity.User.UserStatus;
import com.telugu.cuj.entity.User.UserType;
import com.telugu.cuj.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdminService {
    
	private final UserRepository userRepo;
	
	private final FileStorageService fss;
	
	
	public AdminService(UserRepository userRepo, FileStorageService fss) {
		super();
		this.userRepo = userRepo;
		this.fss=fss;
	}

	private User getUserById(Long id) {
		return userRepo.findById(id).orElseThrow(
				()->new RuntimeException("User not found with id: " + id));
	}
	
	/**
	 * method used to get the pending approvals uses pagination concept
	 * */
	public Page<AdminUserResponse> getPendingApprovals(int page, int size, String sortBy, String direction,UserType userType) {
		
		Sort sort=direction.equalsIgnoreCase("asc")
		        ? Sort.by(sortBy).ascending()
		                : Sort.by(sortBy).descending();
		
		Pageable pageable = PageRequest.of(page, size,sort);
		if (userType != null) {
			 Page<User> pendingUsers=userRepo.findByStatusAndUserType(UserStatus.PENDING, userType, pageable);
			 return pendingUsers.map(user->new AdminUserResponse(
					 user.getId(),user.getName(),user.getEmail(),user.getDepartment(),user.getUserType(),user.getCreatedAt(),"NOT_APPROVED",null,user.getUserName()
					 ));
		}
		
		 Page<User> pendingUsers=userRepo.findByStatus(UserStatus.PENDING,pageable);
		 return pendingUsers.map(user->new AdminUserResponse(
				 user.getId(),user.getName(),user.getEmail(),user.getDepartment(),user.getUserType(),user.getCreatedAt(),"NOT_APPROVED",null,user.getUserName()
				 ));

	}

	public void approveUser(Long targetUserId, String adminUsername) {

	    User admin = userRepo.findByUserName(adminUsername)
	        .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));

	    // Safety: ensure caller is actually admin
	    if (admin.getRole() != Role.ADMIN) {
	        throw new AccessDeniedException("Only admins can approve users");
	    }

	    User target = userRepo.findById(targetUserId)
	        .orElseThrow(() -> new EntityNotFoundException("User not found"));

	    // admin cannot approve themselves
	    if (admin.getId().equals(target.getId())) {
	        throw new IllegalStateException("Admin cannot approve self");
	    }

	    // cross-check: to prevent double approval
	    if (target.getStatus() == UserStatus.ACTIVE) {
	        throw new IllegalStateException("User is already approved");
	    }

	    target.setStatus(UserStatus.ACTIVE);
	    target.setApprovedBy(admin);
	    target.setApprovedAt(LocalDateTime.now());
	    userRepo.save(target);
	}


	public void rejectUser(Long targetUserId,String adminUsername) {
		
		User admin = userRepo.findByUserName(adminUsername)
		        .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));

		    // Safety: ensure caller is actually admin
		    if (admin.getRole() != Role.ADMIN) {
		        throw new AccessDeniedException("Only admins can approve users");
		    }

		    User target = userRepo.findById(targetUserId)
		        .orElseThrow(() -> new EntityNotFoundException("User not found"));

		    // admin cannot reject themselves
		    if (admin.getId().equals(target.getId())) {
		        throw new IllegalStateException("Admin cannot approve self");
		    }
		String photoUrl=target.getPhotoUrl();
		if(photoUrl!=null&&!Objects.equals(photoUrl, "")) {
			fss.deleteImage(photoUrl);
			System.out.println(target.getName()+" image deleted from the cloud!!");
		}
		userRepo.delete(target);
		
	}
	
	/**
	 * method used to update the user role
	 * */
	public ResponseEntity<String> updateUserRole(Long id, UserType newRole) {
        User user = getUserById(id);
        user.setUserType(newRole);
        userRepo.save(user);
        return ResponseEntity.ok("Updated "+user.getName()+" to "+newRole+"!");
    }

	/**
	 * method to get the list of all approved users in the form of pages.
	 * */
	public Page<AdminUserResponse> getApprovedUsers(int page, int size, String sortBy, String direction,
			UserType userType) {
		Sort sort=direction.equalsIgnoreCase("asc")
		        ? Sort.by(sortBy).ascending()
		                : Sort.by(sortBy).descending();
		
		Pageable pageable = PageRequest.of(page, size,sort);
		if (userType != null) {
			 Page<User> approvedUsers=userRepo.findByStatusAndUserType(UserStatus.ACTIVE, userType, pageable);
			 return approvedUsers.map(user->new AdminUserResponse(
					 user.getId(),user.getName(),user.getEmail(),
					 user.getDepartment(),user.getUserType(),user.getCreatedAt(),
					 user.getApprovedBy() != null ? user.getApprovedBy().getName() : null,user.getApprovedAt(),user.getUserName()
					 ));
		}
		
		 Page<User> approvedUsers=userRepo.findByStatus(UserStatus.ACTIVE,pageable);
		 return approvedUsers.map(user->new AdminUserResponse(
				 user.getId(),user.getName(),user.getEmail(),
				 user.getDepartment(),user.getUserType(),user.getCreatedAt(),
				 user.getApprovedBy() != null ? user.getApprovedBy().getName() : null,user.getApprovedAt(),user.getUserName()
				 ));
	}

}
