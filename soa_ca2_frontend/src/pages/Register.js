import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchRegister } from '../services/api';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const response = await fetchRegister('api/Auth/register', { name, email, username, password, role });
            console.log(response);

            if (response.message !== null) {
                localStorage.setItem('isLoggedIn', true);
                setIsLoggedIn(true);
                console.log('Registered successfully:', response);
            } else {
                setError('Register failed. Please try again.');
            }

        }catch(error){
            setError('Registration failed. Please try again.');
            console.error('Error during registration:', error);
        }
    };

    if (isLoggedIn) {
        return (
            console.log('Registered successfully'),
            <div>
                <p>User added</p>
            </div>
        );
    }

    return (
        <div className="register-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ padding: '10px', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}>Register</button>
            </form>
        </div>
    );
};

export default Register;