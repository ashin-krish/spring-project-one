package com.example.projectone.controller;



import com.example.projectone.model.Student;
import com.example.projectone.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/student")
public class StudentController
{

    final private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    @GetMapping("/viewAll")
    public ResponseEntity<List<Student>> getAllStudent()
    {
       List<Student> students = studentService.getAllStudent();

         return ResponseEntity.ok(students);
    }

    @PostMapping("/save")
    public ResponseEntity<Student> createStudent(@RequestBody Student student)
    {
        studentService.saveStudent(student);

        return ResponseEntity.ok(student);
    }

    @PutMapping("/update")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student)
    {
        Optional<Student> updatedStudent =
                studentService.updateStudent(student.getId(), student);

        if (updatedStudent.isPresent())
        {
            return ResponseEntity.ok(updatedStudent.get());
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteStudent(@PathVariable long id)
    {
        boolean isDeleted = studentService.deleteStudent(id);

        return ResponseEntity.ok(isDeleted);
    }

}
