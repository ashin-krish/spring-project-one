package com.example.projectone.service;


import com.example.projectone.model.Student;
import com.example.projectone.repo.StudentRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Configuration
public class MyUserDetailService implements UserDetailsService
{
    final private StudentRepository studentRepository;

    public MyUserDetailService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        Optional<Student> student = studentRepository.findByName(username);

        if (student.isEmpty())
        {
            throw new UsernameNotFoundException("No User Found");
        }

        return User.withUsername(student.get().getName())
                .password(student.get().getPassword())
                .roles("USER")
                .build();

    }
}
