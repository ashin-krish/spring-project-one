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
        <section className="form-panel">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">New record</p>
                    <h2>Add a student</h2>
                </div>
                <span className="section-number">01</span>
            </div>
            <form className="student-form" onSubmit={handleSubmit}>

                <label>Full name
                    <input name="name" placeholder="e.g. Alex Morgan" value={student.name} onChange={handleChange} />
                </label>

                <label>Email address
                    <input name="email" placeholder="alex@example.com" value={student.email} onChange={handleChange} />
                </label>

                <label>Course
                    <input name="course" placeholder="e.g. Computer Science" value={student.course} onChange={handleChange} />
                </label>

                <label>Password
                    <input name="password" placeholder="Create a password" value={student.password} onChange={handleChange} />
                </label>

                <label className="age-field">Age
                    <input name="age" type="number" placeholder="21" value={student.age} onChange={handleChange} />
                </label>

                <button className="primary-button" type="submit">Add student <span aria-hidden="true">+</span></button>

            </form>
        </section>
    );
}

export default StudentForm;