import { useEffect, useState } from "react";
import { getStudents, updateStudent } from "../service/api";

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

    const handleEdit = (student) => {
        setEditingStudent({
            ...student
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setEditingStudent({
            ...editingStudent,
            [name]: value
        });
    };

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

    const handleCancel = () => {
        setEditingStudent(null);
    };

    return (
        <div>
            <h1>Students</h1>

            {students.map(student => (
                <div key={student.id}>

                    {editingStudent &&
                    editingStudent.id === student.id ? (

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

                        <div>
                            <p>Name: {student.name}</p>
                            <p>Email: {student.email}</p>
                            <p>Course: {student.course}</p>
                            <p>Age: {student.age}</p>

                            <button onClick={() => handleEdit(student)}>
                                Update
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