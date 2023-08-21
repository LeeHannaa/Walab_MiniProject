package com.example.miniproject.repo;

import com.example.miniproject.entity.StuInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StuInfoRepository extends JpaRepository<StuInfo,Long> {

}
