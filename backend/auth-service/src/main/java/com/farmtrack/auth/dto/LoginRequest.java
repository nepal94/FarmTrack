package com.farmtrack.auth.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String mobile;
    private String password;
}
