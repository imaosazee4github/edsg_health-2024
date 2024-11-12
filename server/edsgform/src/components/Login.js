import React, { useState } from 'react';
import './Login.css';
import loginPic from '../assets/edlogo.png';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);  // Set loading to true while the request is being made

        try {
            const dataResponse = await fetch('http://localhost:8080/apps/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    email: data.email, 
                    password: data.password 
                }),
            });

            setIsLoading(false);  // Reset loading state after receiving the response

            if (!dataResponse.ok) {
                throw new Error('Email or password not correct.');
            }

            const dataApi = await dataResponse.json();

            // Handle successful login and store token
            if (dataApi.token) {
                localStorage.setItem("authToken", dataApi.token); // Store the JWT token
                navigate('/dashboard');  // Redirect to the dashboard page after successful login
            } else {
                setError(dataApi.message || 'Invalid email or password');
            }
        } catch (error) {
            setIsLoading(false);  // Reset loading state
            setError("Login error: " + error.message);
            console.error("Login error:", error);
        }
    };

    return (
        <div className="login-container">
            {/* Left Side: Form Section */}
            <div className="login-form">
                {/* Header with Logo */}
                <header className="login-header">
                    <img src={loginPic} alt="Ministry of Health Logo" className="login-logo" />
                </header>
                <div className="form-content">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Logging......' : 'Login'}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </div>

            {/* Right Side: Image Section */}
            <div className="login-image">
                <div className="promo-text">
                    <h3>Ensuring Quality Health Services in Edo State</h3>
                    <p><em>
                        "Our mission is to assess and improve the performance of health facilities, ensuring they meet the best standards for patient care and operational efficiency."
                    </em></p>
                    <p>
                        This platform provides a streamlined system for healthcare professionals to submit facility assessments, review reports, and help enhance the health services provided across Edo State. 
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

