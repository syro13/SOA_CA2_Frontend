import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetch, fetchEdit } from '../services/api';

function EditSchedule() {
    const { id } = useParams();
    const [courseId, setCourseId] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTime] = useState('');
    const [isAutoGenerated, setIsAutoGenerated] = useState(true);
    const [generatedBy, setGeneratedBy] = useState('');

    useEffect(() => {
        const getSchedule = async () => {
            try {
                const response = await fetch(`api/Schedules/${id}`, localStorage.getItem('authToken'));

                const formattedDate = new Date(response.date).toISOString().split('T')[0];

                setCourseId(response.courseId);
                setInstructorId(response.instructorId);
                setRoomId(response.roomId);
                setDate(response.date);
                setTime(response.timeSlot);
                setIsAutoGenerated(response.isAutoGenerated);
                setGeneratedBy(response.generatedBy);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        getSchedule();
    }, [id]);

    const handleEditSchedule = async (e) => {
        e.preventDefault();
        try {
            await fetchEdit(`api/Schedules/${id}`, localStorage.getItem('authToken'), { courseId, instructorId, roomId, date, timeSlot, "isAutoGenerated": false, generatedBy: localStorage.getItem('role') });
            window.location.href = `/schedules`;
        } catch (error) {
            console.log('Error updating schedule:', error);
        }
    };

    return (
        <div className="main-container">
            <div className='form-container'>
                <h1>Edit Schedule</h1>
                <form onSubmit={handleEditSchedule}>
                    <div>
                        <input
                            type="text"
                            placeholder="Course ID"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                            maxLength="100"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Instructor ID"
                            value={instructorId}
                            onChange={(e) => setInstructorId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
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

export default EditSchedule;