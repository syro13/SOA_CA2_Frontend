import React, { useState } from 'react';
import { fetchAdd } from '../services/api';

function AddInstructor() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddInstructor = async (e) => {
        e.preventDefault();
        try {
            await fetchAdd('api/Instructors?userId=1', localStorage.getItem('authToken'), { name, email});
            window.location.href = `/instructors`;
          } catch (error) {
            console.log('Error adding instructors:', error);
          }
    }

    return (
        <div className="main-container">
            <div className='form-container'>
            <h1>Add Instructor</h1>
            <form onSubmit={handleAddInstructor}>
                <div>
                    <input
                        type="text"
                        placeholder="Instructor Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength="100"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Instructor Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength="255"
                        required
                    />
                </div>
                <button type="submit" className='btn'>Add Instructor</button>
            </form>
            </div>
        </div>
    );
    }

export default AddInstructor;