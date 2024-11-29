import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetch, fetchEdit } from '../services/api';

function EditInstructor() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getInstructor = async () => {
          try {
            const response = await fetch(`api/Instructors/${id}`, localStorage.getItem('authToken'));
            setName(response.name);
            setEmail(response.email);
          } catch (error) {
            console.error('Error fetching instructors:', error);
          }
        };
    
        getInstructor();
      }, [id]);

    const handleEditInstructor = async (e) => {
        e.preventDefault();
        try {
            await fetchEdit(`api/Instructors/${id}`, localStorage.getItem('authToken'), {name, email});
            window.location.href = `/instructors`;
          } catch (error) {
            console.log('Error fetching instructors:', error);
          }
    }

   
    return (
        <div className="main-container">
            <h1>Edit Instructor</h1>
            <p>Welcome to the Edit Instructor Page!</p>
            <form onSubmit={handleEditInstructor}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Instructor Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength="100"
                        required
                        style={{ pEditing: '10px', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Instructor email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength="255"
                        required
                        style={{ pEditing: '10px', width: '100%' }}
                    />
                </div>
                <button type="submit" style={{
                        pEditing: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}>Edit Instructor</button>
            </form>
        </div>
    );
    }

export default EditInstructor;