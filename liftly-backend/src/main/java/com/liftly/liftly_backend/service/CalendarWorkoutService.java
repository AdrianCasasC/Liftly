package com.liftly.liftly_backend.service;

import com.liftly.liftly_backend.model.dto.CalendarWorkoutDto;
import com.liftly.liftly_backend.model.entity.CalendarWorkout;
import com.liftly.liftly_backend.model.entity.TrainingTemplate;
import com.liftly.liftly_backend.model.entity.User;
import com.liftly.liftly_backend.repository.CalendarWorkoutRepository;
import com.liftly.liftly_backend.repository.TrainingTemplateRepository;
import com.liftly.liftly_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CalendarWorkoutService {

    private final CalendarWorkoutRepository calendarRepository;
    private final TrainingTemplateRepository templateRepository;
    private final UserRepository userRepository;

    public CalendarWorkoutService(CalendarWorkoutRepository calendarRepository,
                                  TrainingTemplateRepository templateRepository,
                                  UserRepository userRepository) {
        this.calendarRepository = calendarRepository;
        this.templateRepository = templateRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<CalendarWorkoutDto> getWorkoutsInMonth(String email, int year, int month) {
        User user = userRepository.findByEmail(email).orElseThrow();
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        return calendarRepository.findWorkoutsInMonth(user.getId(), start, end).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CalendarWorkoutDto scheduleWorkout(String email, CalendarWorkoutDto dto) {
        User user = userRepository.findByEmail(email).orElseThrow();
        TrainingTemplate template = templateRepository.findById(dto.templateId())
                .orElseThrow(() -> new IllegalArgumentException("Template not found"));

        if (!template.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Not authorized to use this template");
        }

        CalendarWorkout workout = new CalendarWorkout();
        workout.setUser(user);
        workout.setTemplate(template);
        workout.setScheduledDate(dto.scheduledDate());
        workout.setCompleted(dto.completed() != null ? dto.completed() : false);

        workout = calendarRepository.save(workout);
        return mapToDto(workout);
    }

    private CalendarWorkoutDto mapToDto(CalendarWorkout workout) {
        return new CalendarWorkoutDto(
                workout.getId(),
                workout.getUser().getId(),
                workout.getTemplate().getId(),
                workout.getScheduledDate(),
                workout.getCompleted()
        );
    }
}
