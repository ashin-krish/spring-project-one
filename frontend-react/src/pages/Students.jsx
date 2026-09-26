import { useEffect, useState } from "react";
import {
    getStudents,
    updateStudent,
    deleteStudent
} from "../service/api";

function Students() {

    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        getStudents()
            .then(data => {
                setStudents(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Start editing
    const handleEdit = (student) => {
        setEditingStudent({
            ...student
        });
    };

    // Handle changes in edit fields
    const handleChange = (event) => {
        const { name, value } = event.target;

        setEditingStudent({
            ...editingStudent,
            [name]: value
        });
    };

    // Save updated student
    const handleUpdate = async () => {
        try {
            const updatedStudent = await updateStudent(editingStudent);

            setStudents(
                students.map(student =>
                    student.id === updatedStudent.id
                        ? updatedStudent
                        : student
                )
            );

            setEditingStudent(null);

        } catch (error) {
            console.error(error);
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setEditingStudent(null);
    };

    // Delete student
    const handleDelete = async (id) => {
        try {
            await deleteStudent(id);

            setStudents(
                students.filter(student => student.id !== id)
            );

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="students-panel">
            <div className="section-heading students-heading">
                <div>
                    <p className="eyebrow">Records</p>
                    <h2>All students</h2>
                </div>
                <span className="student-count">{students.length} {students.length === 1 ? "student" : "students"}</span>
            </div>
            <div className="student-list">
                {students.length === 0 && <div className="empty-state">No student records yet. Add the first one above.</div>}

                {students.map(student => (

                    <article className="student-card" key={student.id}>
                        <div className="student-avatar">{student.name?.charAt(0).toUpperCase()}</div>

                        {editingStudent && editingStudent.id === student.id ? (

                            <div className="student-content edit-content">

                                <p className="student-name">{student.name}</p>

                                <label>Email
                                    <input name="email" value={editingStudent.email} onChange={handleChange} />
                                </label>

                                <label>Course
                                    <input name="course" value={editingStudent.course} onChange={handleChange} />
                                </label>

                                <p className="student-meta">Age <strong>{student.age}</strong></p>

                                <div className="action-row">
                                    <button className="primary-button small-button" onClick={handleUpdate}>Save update</button>
                                    <button className="ghost-button" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="student-content">
                                <div className="student-topline">
                                    <p className="student-name">{student.name}</p>
                                    <span className="course-tag">{student.course}</span>
                                </div>
                                <p className="student-email">{student.email}</p>
                                <p className="student-meta">Age <strong>{student.age}</strong></p>
                                <div className="action-row">
                                    <button className="ghost-button" onClick={() => handleEdit(student)}>Edit</button>
                                    <button className="danger-button" onClick={() => handleDelete(student.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </article>

                ))}
            </div>

        </section>
    );
}

export default Students;