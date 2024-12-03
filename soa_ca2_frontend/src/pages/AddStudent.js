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
            <div className='form-container'>
            <h1>Add Student</h1>
            <form onSubmit={handleAddStudent}>
                <div>
                    <input
                        type="text"
                        placeholder="Student Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength="100"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Student Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength="255"
                        required
                    />
                </div>
                <button type="submit" className='btn'>Add Student</button>
            </form>
            </div>
        </div>
    );
}

export default AddStudent;
