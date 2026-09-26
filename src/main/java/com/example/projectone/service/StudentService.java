package com.example.projectone.service;


import com.example.projectone.config.SecurityConfig;
import com.example.projectone.model.Student;
import com.example.projectone.repo.StudentRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService
{
    final private StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository,  PasswordEncoder passwordEncoder)
    {
        this.studentRepository=studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Student saveStudent(Student student)
    {
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return studentRepository.save(student);
    }

    public boolean deleteStudent(long id)
    {
        Optional<Student> student = studentRepository.findById(id);

        if(student.isEmpty())
        {
            return false;
        }

        studentRepository.delete(student.get());
        return true;
    }

    public Optional<Student> updateStudent(long id, Student student)
    {
        Optional<Student> existingStudent = studentRepository.findById(id);

        if(existingStudent.isPresent())
        {
            existingStudent.get().setEmail(student.getEmail());
            existingStudent.get().setCourse(student.getCourse());
            studentRepository.save(existingStudent.get());
            return existingStudent;
        }

        return Optional.empty();
    }

    public List<Student> getAllStudent()
    {
       List<Student> students = studentRepository.findAll();

       return students;
    }



}
