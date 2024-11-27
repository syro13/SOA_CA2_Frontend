import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchLogin } from '../services/api'; // Assuming the axios functions are saved in 'src/services/api.js'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // React state for login status

    // Check localStorage for login state on component mount
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await fetchLogin('api/Auth/login', { username, password, role });

            // Handle success
            if (response.token) {
                localStorage.setItem('role', role);
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('isLoggedIn', 'true'); // Save login state
                setIsLoggedIn(true); // Update React state
                console.log('Login successful:', response);
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            setError('Invalid username or password');
            console.error('Error during login:', err);
        }
    };

    // Redirect if logged in
    if (isLoggedIn) {
        return (
            <div>
                <Navigate to="/courses" />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ padding: '10px', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '10px', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        style={{ padding: '10px', width: '100%' }}
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Student">Student</option>
                    </select>
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
}

export default Login;
