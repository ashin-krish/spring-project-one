const API_URL = "http://localhost:8080/api/student";

export async function getStudents() {
    const response = await fetch(`${API_URL}/viewAll`);

    if (!response.ok) {
        throw new Error("Failed to fetch students");
    }

    return response.json();
}