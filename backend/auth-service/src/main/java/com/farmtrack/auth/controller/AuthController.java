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


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder encoder;
    @Autowired private JwtService jwtService;
    @Autowired private AuthenticationManager authManager;


@PostMapping("/register")
public String register(@RequestBody RegisterRequest request) {
    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(encoder.encode(request.getPassword()));
    userRepo.save(user);
    return "User registered successfully";
}

@PostMapping("/login")
public String login(@RequestBody LoginRequest request) {
    Authentication auth = authManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
    );
    return jwtService.generateToken(auth.getName());
}
}