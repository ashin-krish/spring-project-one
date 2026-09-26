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
        <div>

            <h1>Students</h1>

            {students.map(student => (

                <div key={student.id}>

                    {editingStudent &&
                    editingStudent.id === student.id ? (

                        // EDIT MODE
                        <div>

                            <p>Name: {student.name}</p>

                            <label>
                                Email:
                            </label>

                            <input
                                name="email"
                                value={editingStudent.email}
                                onChange={handleChange}
                            />

                            <br />

                            <label>
                                Course:
                            </label>

                            <input
                                name="course"
                                value={editingStudent.course}
                                onChange={handleChange}
                            />

                            <br />

                            <p>Age: {student.age}</p>

                            <button onClick={handleUpdate}>
                                Save Update
                            </button>

                            <button onClick={handleCancel}>
                                Cancel
                            </button>

                        </div>

                    ) : (

                        // NORMAL MODE
                        <div>

                            <p>Name: {student.name}</p>
                            <p>Email: {student.email}</p>
                            <p>Course: {student.course}</p>
                            <p>Age: {student.age}</p>

                            <button onClick={() => handleEdit(student)}>
                                Update
                            </button>

                            <button onClick={() => handleDelete(student.id)}>
                                Delete
                            </button>

                        </div>

                    )}

                    <hr />

                </div>

            ))}

        </div>
    );
}

export default Students;