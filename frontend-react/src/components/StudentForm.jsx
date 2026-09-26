import { useState } from "react";
import { createStudent } from "../service/api";

function StudentForm() {

    const [student, setStudent] = useState({
        name: "",
        email: "",
        course: "",
        password: "",
        age: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setStudent({
            ...student,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const savedStudent = await createStudent(student);
            console.log("Student created:", savedStudent);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                name="name"
                placeholder="Name"
                value={student.name}
                onChange={handleChange}
            />

            <input
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleChange}
            />

            <input
                name="course"
                placeholder="Course"
                value={student.course}
                onChange={handleChange}
            />

            <input
                name="password"
                placeholder="Password"
                value={student.password}
                onChange={handleChange}
            />

            <input
                name="age"
                type="number"
                placeholder="Age"
                value={student.age}
                onChange={handleChange}
            />

            <button type="submit">
                Add Student
            </button>

        </form>
    );
}

export default StudentForm;