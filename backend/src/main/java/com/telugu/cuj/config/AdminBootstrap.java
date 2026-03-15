package com.telugu.cuj.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.telugu.cuj.entity.User;
import com.telugu.cuj.repository.UserRepository;

@Configuration
public class AdminBootstrap {

	@Value("${app.admin.username}")
	private String adminUsername;

	@Value("${app.admin.email}")
	private String adminEmail;

	@Value("${app.admin.password}")
	private String adminPassword;

   @Bean
CommandLineRunner createAdmin(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
) {
    return args -> {

        if (userRepository.findByEmail(adminEmail).isEmpty()) {

            User admin = new User();

            admin.setUserName(adminUsername);
            admin.setEmail(adminEmail);

            admin.setPasswordHash(passwordEncoder.encode(adminPassword));

            admin.setName("System Administrator");
            admin.setPreferredName("Admin");

            admin.setRole(User.Role.ADMIN);
            admin.setStatus(User.UserStatus.ACTIVE);
            admin.setUserType(User.UserType.STUDENT);
            admin.setDepartment("ADMIN");

            userRepository.save(admin);
        }
    };
}
}