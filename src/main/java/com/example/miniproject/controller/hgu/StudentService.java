package com.example.miniproject.controller.hgu;

import com.example.miniproject.entity.StuInfo;
import com.example.miniproject.repo.StuInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class StudentService {
    private final StuInfoRepository stuInfoRepository;

    public List<StuInfo> getAllStuInfo() {
        return stuInfoRepository.findAll();
    }
}
