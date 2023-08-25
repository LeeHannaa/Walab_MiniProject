package com.example.miniproject.controller.hgu;

import com.example.miniproject.entity.StuInfo;
import com.example.miniproject.repo.StuInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class StudentService {
    private final StuInfoRepository stuInfoRepository;

    public List<StuInfo> getAllStuInfo() {
        return stuInfoRepository.findAll();
    }

    public StuInfo getStuInfoById(Long studentId) {
        // 학생 ID를 사용하여 해당 학생의 정보 조회
        Optional<StuInfo> student = stuInfoRepository.findById(studentId);
        return student.orElse(null); // 해당 학생이 없으면 null 반환 또는 예외 처리
    }

    public void deleteStuInfo(Long studentId) {
        stuInfoRepository.deleteById(studentId);
    }

    public StuInfo createStuInfo(StuInfo stuInfo) {
        return stuInfoRepository.save(stuInfo);
    }

    public StuInfo updateStuInfo(StuInfo stuInfo) {
        return stuInfoRepository.save(stuInfo);
    }
}
