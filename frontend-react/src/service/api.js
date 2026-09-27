const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${API_BASE_URL}/api/student`;

async function parseError(response, fallbackMessage) {
    if (response.status === 401) {
        throw new Error("Your username or password is incorrect.");
    }

    throw new Error(fallbackMessage);
}

export async function login(credentials) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        await parseError(response, "Unable to sign in right now.");
    }

    return response.text();
}

export async function getProfile() {
    const response = await fetch(`${API_BASE_URL}/profile`, {
        credentials: "include"
    });

    if (!response.ok) {
        await parseError(response, "No active session.");
    }

    return response.text();
}

export async function getStudents() {
    const response = await fetch(`${API_URL}/viewAll`, {
        credentials: "include"
    });

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
        credentials: "include",
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
        credentials: "include",
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        throw new Error("Failed to update student");
    }

    return response.json();
}

export async function deleteStudent(id) {
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to delete student");
    }

    return response.json();
}