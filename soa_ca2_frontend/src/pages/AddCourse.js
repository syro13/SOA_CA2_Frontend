import React, { useState } from 'react';
import { fetchAdd } from '../services/api';

function AddCourse() {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [credits, setCredits] = useState('');

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            await fetchAdd('api/Courses', sessionStorage.getItem('authToken'), { title, description, credits });
            window.location.href = `/courses`;
        } catch (error) {
            console.log('Error fetching courses:', error);
        }
    }

    return (
        <div className="main-container">
            <div className='form-container'>
                <h1>Add Course</h1>
                <form onSubmit={handleAddCourse}>
                    <div>
                        <input
                            type="text"
                            placeholder="Course Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength="100"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Course Description"
                            value={description}
                            onChange={(e) => setDesc(e.target.value)}
                            maxLength="255"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Credits"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                            min="1"
                            max="10"
                            required
                        />
                    </div>
                    <button type="submit" className='btn'>Add Course</button>
                </form>
            </div>
        </div>
    );
}

export default AddCourse;