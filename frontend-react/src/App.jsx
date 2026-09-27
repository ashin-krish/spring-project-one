import { useEffect, useState } from "react";
import Login from "./components/Login";
import Students from "./pages/Students";
import StudentForm from "./components/StudentForm";
import { getProfile } from "./service/api";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    useEffect(() => {
        getProfile()
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false))
            .finally(() => setIsCheckingSession(false));
    }, []);

    if (isCheckingSession) {
        return <main className="session-loading" aria-label="Checking your session">Loading...</main>;
    }

    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <main className="app-shell">
            <header className="app-header">
                <div>
                    <p className="eyebrow">Campus directory</p>
                    <h1>Student Hub</h1>
                    <p className="header-copy">Keep your student records organized and easy to manage.</p>
                </div>
                <div className="header-mark" aria-hidden="true">SH</div>
            </header>
            <StudentForm />
            <Students />
        </main>
    );
}

export default App;