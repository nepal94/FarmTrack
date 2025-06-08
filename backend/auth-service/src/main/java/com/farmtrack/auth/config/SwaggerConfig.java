package com.farmtrack.auth.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Auth Service API",
        version = "1.0",
        description = "API documentation for the FarmTrack Auth microservice"
    ),
    servers = {
        @Server(url = "http://localhost:8082", description = "Local Server")
    }
)
public class SwaggerConfig {
}
