package com.liftly.liftly_backend.service;

import com.liftly.liftly_backend.model.dto.WeightLogDto;
import com.liftly.liftly_backend.model.entity.User;
import com.liftly.liftly_backend.model.entity.WeightLog;
import com.liftly.liftly_backend.repository.UserRepository;
import com.liftly.liftly_backend.repository.WeightLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WeightLogService {

    private final WeightLogRepository weightLogRepository;
    private final UserRepository userRepository;

    public WeightLogService(WeightLogRepository weightLogRepository, UserRepository userRepository) {
        this.weightLogRepository = weightLogRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<WeightLogDto> getUserWeightLogs(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        
        return weightLogRepository.findByUserIdOrderByLoggedDateAsc(user.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public WeightLogDto logWeight(String email, WeightLogDto dto) {
        try {
            User user = userRepository.findByEmail(email).orElseThrow();

            WeightLog weightLog = weightLogRepository.findByUserAndLoggedDate(user, dto.loggedDate())
                    .orElse(new WeightLog());
            
            weightLog.setUser(user);
            weightLog.setWeight(dto.weight());
            weightLog.setLoggedDate(dto.loggedDate());

            weightLog = weightLogRepository.save(weightLog);
            return mapToDto(weightLog);
        } catch (Exception e) {
            System.err.println("Error in logWeight: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    private WeightLogDto mapToDto(WeightLog log) {
        return new WeightLogDto(
                log.getId(),
                log.getUser().getId(),
                log.getWeight(),
                log.getLoggedDate()
        );
    }
}
