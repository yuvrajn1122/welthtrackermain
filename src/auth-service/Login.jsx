import React, { useState } from 'react';
import axios from 'axios';
import './loginStyle.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { email, password };

        try {
            const response = await axios.post("http://localhost:5001/api/v1/auth/login", data);

            if (response.data === "false") {
                alert("Invalid email ID or password");
            } else {
                document.cookie = "token=" + response?.data?.token;
                window.location.href = "/dashboard";
            }
        } catch (error) {
            console.error("There was an error with the login request:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    const redirectToRegister = () => {
        window.location.href = "/register";
    };

    return (
        <div className="login-page">
            {/* Header Section */}
            <header className="header-login">
                <div className="logo">
                    <img src="/src/assets/welthTrackerFinalLogo.svg" alt="Logo-image" />
                    <h1>Wealth Tracker</h1>
                    
                </div>
            </header>

            {/* Login Form */}
            <div className="login-container">
                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <h2 className="login-header">Welcome</h2>
                        <p className="subtext">Enter your username and password to login</p>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="help-links">
                            <a href="/contact-us" onClick={redirectToRegister}>Help?</a>
                            <a href="/forgotPassword">Forgot password?</a>
                        </div>
                        <div class="button-container">
                        <button type="submit" class="login-button">Login</button>
</div>
                        <p className="register-link">
                            Don't have an account? 
                            <a href="/register" onClick={redirectToRegister}> Register</a>
                        </p>
                    </form>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="footer-login">
                <p>Copyright © 2024. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Login;
