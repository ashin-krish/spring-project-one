import Students from "./pages/Students";
import StudentForm from "./components/StudentForm";

function App() {
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