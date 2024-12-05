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
            const response = await fetch(`api/Courses/${id}`, sessionStorage.getItem('authToken'));
            setTitle(response.title);
            setDesc(response.description);
            setCredits(response.credits);
          } catch (error) {
            throw error;
          }
        };
    
        getCourse();
      }, [id]);

    const handleEditCourse = async (e) => {
        e.preventDefault();
        try {
            await fetchEdit(`api/Courses/${id}`, sessionStorage.getItem('authToken'), {title, description, credits});
            window.location.href = `/courses`;
          } catch (error) {
            throw error;
          }
    }

   
    return (
        <div className="main-container">
            <div className='form-container'>
            <h1>Edit Course</h1>
            <form onSubmit={handleEditCourse}>
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
                <button type="submit" className='btn'>Edit Course</button>
            </form>
            </div>
        </div>
    );
    }

export default EditCourse;