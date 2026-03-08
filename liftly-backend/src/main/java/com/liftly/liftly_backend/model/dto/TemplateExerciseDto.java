package com.liftly.liftly_backend.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record TemplateExerciseDto(
    Long id,
    Long templateId,
    @NotNull(message = "Exercise is required")
    ExerciseDto exercise,
    @Min(value = 1, message = "At least 1 set is required")
    Integer sets,
    @Min(value = 1, message = "At least 1 rep is required")
    Integer reps,
    @Min(value = 0, message = "Rest time must be positive")
    Integer restTimeSeconds
) {}
