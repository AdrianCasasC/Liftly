package com.liftly.liftly_backend.controller;

import com.liftly.liftly_backend.model.dto.TrainingTemplateDto;
import com.liftly.liftly_backend.service.TrainingTemplateService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
public class TrainingTemplateController {

    private final TrainingTemplateService templateService;

    public TrainingTemplateController(TrainingTemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping
    public ResponseEntity<List<TrainingTemplateDto>> getUserTemplates(Authentication authentication) {
        return ResponseEntity.ok(templateService.getTemplatesByUser(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<TrainingTemplateDto> createTemplate(@Valid @RequestBody TrainingTemplateDto templateDto,
                                                             Authentication authentication) {
        return ResponseEntity.ok(templateService.createTemplate(authentication.getName(), templateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTemplate(@PathVariable Long id, Authentication authentication) {
        templateService.deleteTemplate(id, authentication.getName());
        return ResponseEntity.ok("Template deleted successfully");
    }
}
