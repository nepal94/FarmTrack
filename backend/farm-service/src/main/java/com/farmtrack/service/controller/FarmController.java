package com.farmtrack.service.controller;

import com.farmtrack.service.entity.Farm;
import com.farmtrack.service.service.FarmService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
public class FarmController {

    private final FarmService farmService;

    public FarmController(FarmService farmService) {
        this.farmService = farmService;
    }

    @GetMapping
    public List<Farm> getAllFarms() {
        return farmService.getAllFarms();
    }

    @PostMapping
    public Farm createFarm(@RequestBody Farm farm) {
        return farmService.addFarm(farm);
    }
}