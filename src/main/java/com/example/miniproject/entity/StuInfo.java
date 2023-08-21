package com.example.miniproject.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "STUINFO")
public class StuInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String name;

    private String department;

    private String campname;

    @Temporal(TemporalType.DATE)
    private Date campstartdate;

    @Temporal(TemporalType.DATE)
    private Date campfinishdate;

}
