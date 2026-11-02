
package com.backend.service;

import com.backend.entity.Student;
import org.springframework.data.domain.Page;

public interface StudentService {

    Student addStudent(Student student);

    Student getStudentById(Long id);

    Student updateStudent(Long id, Student student);

    void deleteStudent(Long id);

    Page<Student> getStudents(
            int page,
            int size,
            String search
    );
}
