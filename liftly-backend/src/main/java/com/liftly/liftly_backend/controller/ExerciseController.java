package com.liftly.liftly_backend.controller;

import com.liftly.liftly_backend.model.dto.ExerciseDto;
import com.liftly.liftly_backend.repository.ExerciseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ExerciseController {

    private final ExerciseRepository exerciseRepository;

    public ExerciseController(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @GetMapping
    public ResponseEntity<List<ExerciseDto>> getAllExercises() {
        List<ExerciseDto> exercises = exerciseRepository.findAll().stream()
                .map(e -> new ExerciseDto(
                        e.getId(),
                        e.getName(),
                        e.getCategory(),
                        e.getTargetMuscle()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(exercises);
    }
}
