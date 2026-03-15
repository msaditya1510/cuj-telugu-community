package com.telugu.cuj.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    	http
        .csrf(csrf -> csrf.disable())
        .cors(Customizer.withDefaults())

        .formLogin(form -> form
                .loginProcessingUrl("/login")
                .successHandler((req, res, auth) ->{
                System.out.println(auth.getAuthorities());
                res.setStatus(200);})
                .failureHandler((req, res, ex) -> res.sendError(401))
        )
        .httpBasic(httpBasic -> httpBasic.disable())
        .requestCache(cache -> cache.disable())
        
        .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessHandler((req, res, auth) -> res.setStatus(200))
        )

        .httpBasic(httpBasic -> httpBasic.disable())

        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
        )

        .authorizeHttpRequests(auth -> auth
            .requestMatchers(
                    "/auth/**",
                    "/login",
                    "/error",
                    "/favicon.ico",
                    "/public/**",
                    "/api/events/**",
                    "/api/users/me",
                    "/"
            ).permitAll()

            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/users/**").authenticated()
            .requestMatchers("/api/contact-cards/**").authenticated()
            

            .anyRequest().denyAll()
        );


//            // 6️⃣ Custom API exception handling
//            .exceptionHandling(ex -> ex
//            	    .authenticationEntryPoint((req, res, e) -> {
//            	        if (req.getRequestURI().startsWith("/api/")) {
//            	            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            	            res.setContentType("application/json");
//            	            res.getWriter().write("""
//            	                {"error":"Unauthorized","message":"Login required"}
//            	            """);
//            	        } else {
//            	            res.sendRedirect("/login");
//            	        }
//            	    })
//            );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }
}
