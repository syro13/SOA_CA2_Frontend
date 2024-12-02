import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetch, fetchEdit } from '../services/api';

function EditStudent() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getStudent = async () => {
            try {
                const response = await fetch(`api/Students/${id}`, localStorage.getItem('authToken'));
                setName(response.name);
                setEmail(response.email);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        getStudent();
    }, [id]);

    const handleEditStudent = async (e) => {
        e.preventDefault();
        try {
            await fetchEdit(`api/Students/${id}`, localStorage.getItem('authToken'), { name, email });
            window.location.href = `/students`;
        } catch (error) {
            console.log('Error editing student:', error);
        }
    };

    return (
        <div className="main-container">
            <h1>Edit Student</h1>
            <p>Welcome to the Edit Student Page!</p>
            <form onSubmit={handleEditStudent}>
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
                    Edit Student
                </button>
            </form>
        </div>
    );
}

export default EditStudent;
