import { useEffect, useState } from "react";
import { getStudents } from "../service/api";

function Students() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents()
            .then(data => {
                setStudents(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Students</h1>

            {students.map(student => (
                <div key={student.id}>
                    <p>Name: {student.name}</p>
                    <p>Email: {student.email}</p>
                    <p>Course: {student.course}</p>
                    <p>Age: {student.age}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Students;