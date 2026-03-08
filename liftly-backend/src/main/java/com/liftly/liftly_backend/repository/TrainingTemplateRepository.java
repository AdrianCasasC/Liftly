package com.liftly.liftly_backend.repository;

import com.liftly.liftly_backend.model.entity.TrainingTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingTemplateRepository extends JpaRepository<TrainingTemplate, Long> {
    List<TrainingTemplate> findByUserId(Long userId);
}
