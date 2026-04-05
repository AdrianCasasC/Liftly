package com.liftly.liftly_backend.repository;

import com.liftly.liftly_backend.model.entity.User;
import com.liftly.liftly_backend.model.entity.WeightLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeightLogRepository extends JpaRepository<WeightLog, Long> {
    List<WeightLog> findByUserIdOrderByLoggedDateAsc(Long userId);
    Optional<WeightLog> findByUserAndLoggedDate(User user, LocalDate loggedDate);
}
