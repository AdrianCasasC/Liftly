package com.liftly.liftly_backend.model.dto;

import com.liftly.liftly_backend.model.enums.MuscleGroup;

public record ExerciseDto(
    Long id,
    String name,
    String category,
    MuscleGroup targetMuscle
) {}
