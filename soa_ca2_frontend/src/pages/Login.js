import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchLogin } from '../services/api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetchLogin('api/Auth/login', { username, password, role });
            if (response.token) {
                sessionStorage.setItem('role', role);
                sessionStorage.setItem('authToken', response.token);
                sessionStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            setError('Invalid username or password');
            throw error;
        }
    };

    if (isLoggedIn) {
        return (
            <div>
                <Navigate to="/courses" />
            </div>
        );
    }

    return (
        <div className="main-container">
            <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Student">Student</option>
                    </select>
                </div>
                <button className='btn' type="submit">
                    Login
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </div>
        </div>
    );
}

export default Login;
