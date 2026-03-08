package com.liftly.liftly_backend.repository;

import com.liftly.liftly_backend.model.entity.CalendarWorkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CalendarWorkoutRepository extends JpaRepository<CalendarWorkout, Long> {
    
    @Query("SELECT cw FROM CalendarWorkout cw WHERE cw.user.id = :userId AND cw.scheduledDate >= :startDate AND cw.scheduledDate <= :endDate")
    List<CalendarWorkout> findWorkoutsInMonth(
            @Param("userId") Long userId, 
            @Param("startDate") LocalDate startDate, 
            @Param("endDate") LocalDate endDate);
}
