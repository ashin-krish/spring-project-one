package com.example.projectone.repo;

import com.example.projectone.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,Long>
{
    Optional<Student> findByName(String name);

}
