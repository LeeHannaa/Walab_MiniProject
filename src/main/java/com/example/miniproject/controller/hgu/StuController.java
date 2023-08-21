package com.example.miniproject.controller.hgu;

import com.example.miniproject.entity.StuInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
