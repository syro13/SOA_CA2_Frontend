import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetch, fetchEdit } from '../services/api';

function EditCourse() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [credits, setCredits] = useState('');

    useEffect(() => {
        const getCourse = async () => {
          try {
            const response = await fetch(`api/Courses/${id}`, localStorage.getItem('authToken'));
            setTitle(response.title);
            setDesc(response.description);
            setCredits(response.credits);
          } catch (error) {
            console.error('Error fetching courses:', error);
          }
        };
    
        getCourse();
      }, [id]);

    const handleEditCourse = async (e) => {
        e.preventDefault();
        try {
            await fetchEdit(`api/Courses/${id}`, localStorage.getItem('authToken'), {title, description, credits});
            window.location.href = `/courses`;
          } catch (error) {
            console.log('Error fetching courses:', error);
          }
    }

   
    return (
        <div className="main-container">
            <h1>Edit Course</h1>
            <p>Welcome to the Edit Course Page!</p>
            <form onSubmit={handleEditCourse}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Course Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength="100"
                        required
                        style={{ pEditing: '10px', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Course Description"
                        value={description}
                        onChange={(e) => setDesc(e.target.value)}
                        maxLength="255"
                        required
                        style={{ pEditing: '10px', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="number"
                        placeholder="Credits"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        min="1"
                        max="10"
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
                    }}>Edit Course</button>
            </form>
        </div>
    );
    }

export default EditCourse;