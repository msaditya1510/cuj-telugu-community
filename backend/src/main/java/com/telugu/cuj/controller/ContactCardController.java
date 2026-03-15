package com.telugu.cuj.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.telugu.cuj.dto.ContactCardDTO;
import com.telugu.cuj.entity.User;
import com.telugu.cuj.service.ContactCardService;

@RestController
@RequestMapping("/api/contact-cards")
public class ContactCardController {
	
	private final ContactCardService contactCardService;
	
	public ContactCardController(ContactCardService ccs) {
		super();
		this.contactCardService = ccs;
	}
	
	@GetMapping("/search")
    public ResponseEntity<List<ContactCardDTO>> searchUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) User.UserType type) {
        
        List<ContactCardDTO> results = new ArrayList<>();
        
        
        // Implement search logic based on parameters
        if (type != null) {
        	
        	if(name==null&&department==null)
            results.addAll(contactCardService.getAllApprovedUsersByRole(type));
        	
        	else if(name!=null&&department==null)
        		results.addAll(contactCardService.getAllApprovedUsersByRoleAndName(type,name));
        	
        	else
        		results.addAll(contactCardService.getAllApprovedUsersByRoleNameAndDepartment(type,name,department));
        } 
        
        else { //role is null
        	if(name==null&&department!=null)
                results.addAll(contactCardService.getAllApprovedUsersByDepartment(department));
        	
        	else if(name!=null&&department==null)
            results.addAll(contactCardService.getAllApprovedUsersByName(name));
        	
        	else
        		results.addAll(contactCardService.getAllApprovedUsers());
        }
        
        return ResponseEntity.ok(results);
    }
	
	@GetMapping("/profile/{id}")
	public ResponseEntity<?> getFullProfileCard(@PathVariable Long id){
		return ResponseEntity.ok(contactCardService.getFullProfileCard(id));
	}
	
	
}
