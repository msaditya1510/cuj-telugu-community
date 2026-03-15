package com.telugu.cuj.controller.admin;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.telugu.cuj.dto.AdminUserResponse;
import com.telugu.cuj.entity.User.UserType;
import com.telugu.cuj.service.AdminService;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

	private final AdminService adminService;

	public AdminUserController(AdminService adminService) {
		super();
		this.adminService = adminService;
	}

	/**
	 * to fetch pending approvals
	 */
	@GetMapping("/pending")
	public ResponseEntity<?> getPendingApprovals( @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "createdAt") String sortBy,
	        @RequestParam(defaultValue = "asc") String direction,@RequestParam(required = false) UserType userType
) {
		Page<AdminUserResponse> result = adminService.getPendingApprovals(page,size,sortBy,direction,userType);
		return ResponseEntity.ok(
				Map.of(
				        "content", result.getContent(),
				        "currentPage", result.getNumber(),
				        "totalPages", result.getTotalPages(),
				        "totalElements", result.getTotalElements()
				));
	}

	@GetMapping("/approved")
	public ResponseEntity<?> getApprovedUsers( @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "name") String sortBy,
	        @RequestParam(defaultValue = "asc") String direction,@RequestParam(required = false) UserType userType
) {
		Page<AdminUserResponse> result = adminService.getApprovedUsers(page,size,sortBy,direction,userType);
		return ResponseEntity.ok(
				Map.of(
				        "content", result.getContent(),
				        "currentPage", result.getNumber(),
				        "totalPages", result.getTotalPages(),
				        "totalElements", result.getTotalElements()
				));
	}

	/**
	 * method to approve user registration
	 */
	@PatchMapping("/{id}/approve")
	public ResponseEntity<Map<String,String>> approveUser(@PathVariable Long id,@AuthenticationPrincipal UserDetails admin) {
		adminService.approveUser(id,admin.getUsername());
		return ResponseEntity.ok(Map.of("message", "User approved"));
	}

	/**
	 * method to reject user registration
	 * */
	@PatchMapping("/{id}/reject")
	public ResponseEntity<Map<String,String>> rejectUser(@PathVariable Long id,@AuthenticationPrincipal UserDetails admin) {
		adminService.rejectUser(id,admin.getUsername());
		return ResponseEntity.ok(Map.of("message", "User rejected"));

	}

}
