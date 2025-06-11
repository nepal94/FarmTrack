package com.farmtrack.auth.controller;
import com.farmtrack.auth.dto.LoginRequest;
import com.farmtrack.auth.dto.RegisterRequest;
import com.farmtrack.auth.entity.User;
import com.farmtrack.auth.service.JwtService;
import com.farmtrack.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder encoder;
    @Autowired private JwtService jwtService;
    @Autowired private AuthenticationManager authManager;


@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    if (userRepo.findByMobile(request.getMobile()).isPresent()) {
        return ResponseEntity.badRequest().body(Map.of("error", "Mobile number already registered"));
    }
    if (userRepo.findByUsername(request.getUsername()).isPresent()) {
        return ResponseEntity.badRequest().body(Map.of("error", "Username already registered"));
    }
    User user = new User();
    user.setUsername(request.getUsername());
    user.setMobile(request.getMobile());
    user.setEmail(request.getEmail());
    user.setPassword(encoder.encode(request.getPassword()));
    userRepo.save(user);
    return ResponseEntity.ok(Map.of("message", "User registered successfully"));
}

@PostMapping("/login")
public String login(@RequestBody LoginRequest request) {
    String principal = request.getMobile() != null && !request.getMobile().isEmpty()
        ? request.getMobile()
        : request.getUsername();
    User user = null;
    if (request.getMobile() != null && !request.getMobile().isEmpty()) {
        user = userRepo.findByMobile(request.getMobile()).orElse(null);
    } else if (request.getUsername() != null && !request.getUsername().isEmpty()) {
        user = userRepo.findByUsername(request.getUsername()).orElse(null);
    }
    if (user == null) {
        throw new RuntimeException("User not found");
    }
    Authentication auth = authManager.authenticate(
        new UsernamePasswordAuthenticationToken(principal, request.getPassword())
    );
    return jwtService.generateToken(principal);
}
}