package com.liftly.liftly_backend.controller;

import com.liftly.liftly_backend.model.dto.WeightLogDto;
import com.liftly.liftly_backend.service.WeightLogService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weight")
public class WeightLogController {

    private final WeightLogService weightLogService;

    public WeightLogController(WeightLogService weightLogService) {
        this.weightLogService = weightLogService;
    }

    @GetMapping
    public ResponseEntity<List<WeightLogDto>> getHistoricalWeights(Authentication authentication) {
        return ResponseEntity.ok(weightLogService.getUserWeightLogs(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<WeightLogDto> logWeight(@Valid @RequestBody WeightLogDto dto,
                                                 Authentication authentication) {
        return ResponseEntity.ok(weightLogService.logWeight(authentication.getName(), dto));
    }
}
