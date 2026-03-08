package com.liftly.liftly_backend.controller;

import com.liftly.liftly_backend.model.dto.CalendarWorkoutDto;
import com.liftly.liftly_backend.service.CalendarWorkoutService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CalendarWorkoutController {

    private final CalendarWorkoutService calendarService;

    public CalendarWorkoutController(CalendarWorkoutService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping("/month")
    public ResponseEntity<List<CalendarWorkoutDto>> getMonthWorkouts(
            @RequestParam int year,
            @RequestParam int month,
            Authentication authentication) {
        return ResponseEntity.ok(calendarService.getWorkoutsInMonth(authentication.getName(), year, month));
    }

    @PostMapping
    public ResponseEntity<CalendarWorkoutDto> scheduleWorkout(@Valid @RequestBody CalendarWorkoutDto dto,
                                                             Authentication authentication) {
        return ResponseEntity.ok(calendarService.scheduleWorkout(authentication.getName(), dto));
    }
}
