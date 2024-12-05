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
                const response = await fetch(`api/Students/${id}`, sessionStorage.getItem('authToken'));
                setName(response.name);
                setEmail(response.email);
            } catch (error) {
                throw error;
            }
        };

        getStudent();
    }, [id]);

    const handleEditStudent = async (e) => {
        e.preventDefault();
        try {
            await fetchEdit(`api/Students/${id}`, sessionStorage.getItem('authToken'), { name, email });
            window.location.href = `/students`;
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="main-container">
            <div className='form-container'>
            <h1>Edit Student</h1>
            <form onSubmit={handleEditStudent}>
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
                <button type="submit" className='btn'>Edit Student</button>
            </form>
            </div>
        </div>
    );
}

export default EditStudent;
