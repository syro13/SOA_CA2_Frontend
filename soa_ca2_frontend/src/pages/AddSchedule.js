import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetch, fetchAdd } from '../services/api';

function AddSchedule() {
    const [courseId, setCourseId] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTime] = useState('');

    const handleAddSchedule = async (e) => {
        e.preventDefault();
        try {
            await fetchAdd(`api/Schedules`, localStorage.getItem('authToken'), { courseId, instructorId, roomId, date, timeSlot, "isAutoGenerated": true, generatedBy: localStorage.getItem('role') });
            window.location.href = `/schedules`;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="main-container">
            <div className='form-container'>
                <h1>Add Schedule</h1>
                <form onSubmit={handleAddSchedule}>
                    <div>
                        <input
                            type="number"
                            placeholder="Course ID"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                            maxLength="100"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Instructor ID"
                            value={instructorId}
                            onChange={(e) => setInstructorId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Room ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="datetime-local"
                            placeholder="Schedule Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Schedule Time"
                            value={timeSlot}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='btn'>Edit Schedule</button>
                </form>
            </div>
        </div>
    );
}

export default AddSchedule;
