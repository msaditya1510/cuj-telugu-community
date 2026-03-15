package com.telugu.cuj.service;


import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.telugu.cuj.entity.User;
import com.telugu.cuj.repository.UserRepository;
import com.telugu.cuj.security.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        if (user.getStatus() != User.UserStatus.ACTIVE) {
            throw new DisabledException(
                "User account is not active. Please wait for admin approval."
            );
        }

        return new CustomUserDetails(user);
    }
}
