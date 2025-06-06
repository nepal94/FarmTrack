package com.farmtrack.service;

import com.farmtrack.service.entity.Farm;
import com.farmtrack.service.repository.FarmRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FarmApplication {

    public static void main(String[] args) {
        SpringApplication.run(FarmApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(FarmRepository farmRepository) {
        return args -> {
            if (farmRepository.count() == 0) {
                farmRepository.save(new Farm("Green Acres", "Indore", "Nepal Singh"));
                farmRepository.save(new Farm("Golden Fields", "Bhopal", "Ravi Kumar"));
            }
        };
    }
}
