const API_URL = "http://localhost:8080/api/student";

export async function getStudents() {
    const response = await fetch(`${API_URL}/viewAll`);

    if (!response.ok) {
        throw new Error("Failed to fetch students");
    }

    return response.json();
}

export async function createStudent(student) {
    const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        throw new Error("Failed to create student");
    }

    return response.json();
}

export async function updateStudent(student) {
    const response = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        throw new Error("Failed to update student");
    }

    return response.json();
}