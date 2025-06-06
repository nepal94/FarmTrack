package com.farmtrack.service.service;

import com.farmtrack.service.entity.Farm;
import com.farmtrack.service.repository.FarmRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmService {

    private final FarmRepository farmRepository;

    public FarmService(FarmRepository farmRepository) {
        this.farmRepository = farmRepository;
    }

    public List<Farm> getAllFarms() {
        return farmRepository.findAll();
    }

    public Farm addFarm(Farm farm) {
        return farmRepository.save(farm);
    }
}