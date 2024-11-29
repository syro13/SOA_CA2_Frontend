import React, { useState } from 'react';
import { fetchAdd } from '../services/api';

function AddInstructor() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddInstructor = async (e) => {
        e.preventDefault();
        try {
            await fetchAdd('api/Instructors', localStorage.getItem('authToken'), { name, email});
            window.location.href = `/instructors`;
          } catch (error) {
            console.log('Error adding instructors:', error);
          }
    }

    return (
        <div className="main-container">
            <h1>Add Instructor</h1>
            <p>Welcome to the Add Instructor Page!</p>
            <form onSubmit={handleAddInstructor}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Instructor Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength="100"
                        required
                        style={{ padding: '10px', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Instructor Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength="255"
                        required
                        style={{ padding: '10px', width: '100%' }}
                    />
                </div>
                <button type="submit" style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}>Add Instructor</button>
            </form>
        </div>
    );
    }

export default AddInstructor;