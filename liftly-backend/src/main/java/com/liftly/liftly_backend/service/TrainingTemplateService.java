package com.liftly.liftly_backend.service;

import com.liftly.liftly_backend.model.dto.TemplateExerciseDto;
import com.liftly.liftly_backend.model.dto.TrainingTemplateDto;
import com.liftly.liftly_backend.model.entity.Exercise;
import com.liftly.liftly_backend.model.entity.TemplateExercise;
import com.liftly.liftly_backend.model.entity.TrainingTemplate;
import com.liftly.liftly_backend.model.entity.User;
import com.liftly.liftly_backend.repository.ExerciseRepository;
import com.liftly.liftly_backend.repository.TrainingTemplateRepository;
import com.liftly.liftly_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingTemplateService {

    private final TrainingTemplateRepository templateRepository;
    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;

    public TrainingTemplateService(TrainingTemplateRepository templateRepository,
                                   UserRepository userRepository,
                                   ExerciseRepository exerciseRepository) {
        this.templateRepository = templateRepository;
        this.userRepository = userRepository;
        this.exerciseRepository = exerciseRepository;
    }

    @Transactional(readOnly = true)
    public List<TrainingTemplateDto> getTemplatesByUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return templateRepository.findByUserId(user.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public TrainingTemplateDto createTemplate(String email, TrainingTemplateDto dto) {
        User user = userRepository.findByEmail(email).orElseThrow();

        TrainingTemplate template = new TrainingTemplate();
        template.setUser(user);
        template.setName(dto.name());
        template.setDescription(dto.description());

        if (dto.exercises() != null) {
            int orderIndex = 0;
            for (TemplateExerciseDto exDto : dto.exercises()) {
                Exercise exercise = exerciseRepository.findById(exDto.exercise().id())
                        .orElseThrow(() -> new IllegalArgumentException("Exercise not found ID: " + exDto.exercise().id()));

                TemplateExercise te = new TemplateExercise();
                te.setExercise(exercise);
                te.setSets(exDto.sets());
                te.setReps(exDto.reps());
                te.setRestTimeSeconds(exDto.restTimeSeconds() != null ? exDto.restTimeSeconds() : 60);
                te.setOrderIndex(orderIndex++);
                
                template.addExercise(te);
            }
        }

        template = templateRepository.save(template);
        return mapToDto(template);
    }

    @Transactional
    public void deleteTemplate(Long id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        TrainingTemplate template = templateRepository.findById(id).orElseThrow();
        
        if (!template.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Not authorized to delete this template");
        }
        
        templateRepository.delete(template);
    }

    private TrainingTemplateDto mapToDto(TrainingTemplate template) {
        List<TemplateExerciseDto> exercisesDto = template.getExercises().stream()
                .map(te -> new TemplateExerciseDto(
                        te.getId(),
                        template.getId(),
                        new com.liftly.liftly_backend.model.dto.ExerciseDto(
                                te.getExercise().getId(),
                                te.getExercise().getName(),
                                te.getExercise().getCategory(),
                                te.getExercise().getTargetMuscle()
                        ),
                        te.getSets(),
                        te.getReps(),
                        te.getRestTimeSeconds()
                ))
                .collect(Collectors.toList());

        return new TrainingTemplateDto(
                template.getId(),
                template.getUser().getId(),
                template.getName(),
                template.getDescription(),
                exercisesDto
        );
    }
}
