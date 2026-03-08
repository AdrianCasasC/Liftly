package com.liftly.liftly_backend.model.dto;

public record AuthResponse(
    String token,
    String type,
    String email,
    String role
) {
    public AuthResponse(String token, String email, String role) {
        this(token, "Bearer", email, role);
    }
}
