package com.liftly.liftly_backend.model.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record TrainingTemplateDto(
    Long id,
    Long userId,
    @NotBlank(message = "Template name is required")
    String name,
    String description,
    List<TemplateExerciseDto> exercises
) {}
