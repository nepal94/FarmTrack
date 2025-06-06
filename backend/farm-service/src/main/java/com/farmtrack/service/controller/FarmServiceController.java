package com.farmtrack.service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FarmServiceController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Farm Service!";
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "Farm Service is healthy!";
    }

    @GetMapping("/info")
    public String info() {
        return "This is the Farm Service running on port 8081.";
    }
}