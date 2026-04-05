package com.liftly.liftly_backend.model.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CalendarWorkoutDto(
    Long id,
    Long userId,
    @NotNull(message = "Training template is required")
    Long templateId,
    @NotNull(message = "Scheduled date is required")
    LocalDate scheduledDate,
    Boolean completed
) {}
