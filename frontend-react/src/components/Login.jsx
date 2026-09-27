import { useState } from "react";
import { login } from "../service/api";

function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({ name: "", password: "" });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((current) => ({ ...current, [name]: value }));
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            await login(credentials);
            onLogin();
        } catch (loginError) {
            setError(loginError.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="login-page">
            <section className="login-panel" aria-labelledby="login-title">
                <div className="login-intro">
                    <div className="header-mark" aria-hidden="true">SH</div>
                    <p className="eyebrow">Campus directory</p>
                    <h1 id="login-title">Welcome back.</h1>
                    <p className="login-copy">Sign in to keep your student records organized and easy to manage.</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Username
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={credentials.name}
                            onChange={handleChange}
                            autoComplete="username"
                            placeholder="Enter your username"
                            required
                        />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                        />
                    </label>

                    {error && <p className="login-error" role="alert">{error}</p>}

                    <button className="primary-button login-button" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign in"}
                        {!isSubmitting && <span aria-hidden="true">→</span>}
                    </button>
                </form>

                <p className="login-footer">Your session stays active while you work.</p>
            </section>
        </main>
    );
}

export default Login;