package com.liftly.liftly_backend.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;

public record WeightLogDto(
    Long id,
    Long userId,
    @NotNull(message = "Weight is required")
    @Positive(message = "Weight must be positive")
    Double weight,
    @NotNull(message = "Logged date is required")
    LocalDate loggedDate
) {}
