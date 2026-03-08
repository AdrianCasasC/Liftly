package com.liftly.liftly_backend.model.entity;

import com.liftly.liftly_backend.model.enums.MuscleGroup;
import jakarta.persistence.*;

@Entity
@Table(name = "exercises")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "target_muscle", nullable = false)
    private MuscleGroup targetMuscle;

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public MuscleGroup getTargetMuscle() { return targetMuscle; }
    public void setTargetMuscle(MuscleGroup targetMuscle) { this.targetMuscle = targetMuscle; }
}
