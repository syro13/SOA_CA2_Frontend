import React, { useState } from 'react';
import { fetchAdd } from '../services/api';

function AddStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            await fetchAdd('api/Students?userId=1', localStorage.getItem('authToken'), { name, email });
            window.location.href = `/students`;
        } catch (error) {
            console.log('Error adding student:', error);
        }
    };

    return (
        <div className="main-container">
            <h1>Add Student</h1>
            <p>Welcome to the Add Student Page!</p>
            <form onSubmit={handleAddStudent}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Student Name"
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
                        placeholder="Student Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength="255"
                        required
                        style={{ padding: '10px', width: '100%' }}
                    />
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
                    Add Student
                </button>
            </form>
        </div>
    );
}

export default AddStudent;
