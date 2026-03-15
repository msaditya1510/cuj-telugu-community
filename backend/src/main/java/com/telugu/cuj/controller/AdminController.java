package com.telugu.cuj.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.telugu.cuj.entity.User;
import com.telugu.cuj.entity.User.UserType;
import com.telugu.cuj.service.AdminService;
import com.telugu.cuj.service.UserService;

/**
 * 
 */
@RestController
@RequestMapping("/api/admin/")
public class AdminController {

	private final AdminService adminService;
	private final UserService userService;

	public AdminController(AdminService adminService,UserService userService) {
		super();
		this.adminService = adminService;
		this.userService=userService;
	}
	
	/**
	 * to get user by their id -> may remove this method
	 * @deprecated
	 * */
	 @GetMapping("/{id}")
	    public ResponseEntity<User> getUserById(@PathVariable Long id) {
	        User user = userService.getUserById(id);
	        return ResponseEntity.ok(user);
	    }
	 
	 
	
	
	
//	    @GetMapping("/stats")
//	    public ResponseEntity<Map<String, Long>> getAdminStats() {
//	        Map<String, Long> stats = userService.getUserStats();
//	        stats.put("pendingApprovals", (long)adminService.getPendingApprovals().size());
//	        return ResponseEntity.ok(stats);
//	    }
	    
	    @PutMapping
	    public ResponseEntity<String> changeUserRole(Long id,UserType type){
	    	return adminService.updateUserRole(id,type);
	    }
	   
}
