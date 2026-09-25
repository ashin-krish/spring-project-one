package com.example.projectone.repo;

import com.example.projectone.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Long>
{
}
