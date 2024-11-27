import React, { useState } from 'react';
import { fetchRegister } from '../services/api';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(null);
        try{
            const response = await fetchRegister('api/Auth/register', { name, email, username, password, role });
            console.log(response.message);
            console.log(response.data);

            switch(response.message){
                case 'Admin registered successfully.':
                    setMessage('Admin registered successfully.');
                    break;
                case 'User registered successfully.':
                    setMessage('User registered successfully.');
                    break;
                default:
                    setMessage('Error');
                    break;
            };
        }catch(error){
            console.error('Error during registration:', error);
            console.log(error.response.data);
            setError(error.response.data);
        }
    };

    if (message !== null) {
        return (
            <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
                <p>{message}</p>
                <button onClick={() => {
                    setMessage(null)
                    setEmail('')
                    setName('')
                    setPassword('')
                    setUsername('')
                    setRole('')
                    setError('')
                }
                    
                    }>Go back</button>
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
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default Register;