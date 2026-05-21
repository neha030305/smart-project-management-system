package com.smartprojectms.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartprojectms.dto.LoginRequest;
import com.smartprojectms.dto.RegisterRequest;
import com.smartprojectms.entity.Role;
import com.smartprojectms.entity.User;
import com.smartprojectms.repository.UserRepository;
import com.smartprojectms.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        // Check email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Create user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        // Save user
        userRepository.save(user);

        return "User registered successfully";
    }
    
    public Map<String, String> login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        Map<String, String> response = new HashMap<>();

        response.put(
                "token",
                jwtUtil.generateToken(user.getEmail())
        );

        response.put(
                "role",
                user.getRole().name()
        );

        return response;
    }
}
