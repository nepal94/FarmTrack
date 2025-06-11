package com.farmtrack.auth.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String mobile;
    private String password;
    private String email; // Optional if your entity supports it
}
