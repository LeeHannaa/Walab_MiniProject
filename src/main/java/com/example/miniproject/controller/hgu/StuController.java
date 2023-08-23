package com.example.miniproject.controller.hgu;

import com.example.miniproject.entity.StuInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/hgu")
@CrossOrigin(origins = "http://localhost:3000")
public class StuController {
    private final StudentService studentService;

    @GetMapping(value = "/stuInfo")
    public List<StuInfo> getAllStuInfo() {
        return studentService.getAllStuInfo();
    }

    @GetMapping(value = "/stuInfo/{studentId}")
    public StuInfo getStuInfoById(@PathVariable Long studentId) {
        return studentService.getStuInfoById(studentId);
    }

    @DeleteMapping(value = "/stuInfo/{studentId}")
    public void deleteStuInfo(@PathVariable Long studentId) {
        studentService.deleteStuInfo(studentId);
    }

    @PostMapping(value = "/stuInfo/create")
    public StuInfo createStuInfo(@RequestBody StuInfo stuInfo) {
        return studentService.createStuInfo(stuInfo);
    }
}
