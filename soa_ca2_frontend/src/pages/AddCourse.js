import React, { useState } from 'react';
import { fetchAddCourses } from '../services/api';

function AddCourse() {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [credits, setCredits] = useState('');
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchAddCourses('api/Courses', localStorage.getItem('authToken'), {title, description, credits});
            setCourses(response);
          } catch (error) {
            setError('Error fetching courses');
          }
    }

    return (
        <div className="main-container">
            <h1>Add Course</h1>
            <p>Welcome to the Add Course Page!</p>
            <form onSubmit={handleAddCourse}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Course Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength="100"
                        required
                        style={{ padding: '10px', width: '100%' }}
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
                        style={{ padding: '10px', width: '100%' }}
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
                    }}>Add Course</button>
            </form>
        </div>
    );
    }

export default AddCourse;