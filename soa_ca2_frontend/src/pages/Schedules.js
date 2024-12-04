import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetch, fetchDelete } from '../services/api';

Modal.setAppElement('#root');

function Schedules() {
    const [schedules, setSchedules] = useState([]);
    const [courses, setCourses] = useState({});
    const [instructors, setInstructors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getSchedules = async () => {
        setLoading(true);
        try {
            const response = await fetch('api/Schedules', localStorage.getItem('authToken'));
            setSchedules(response);
        } catch (error) {
            setError('Error fetching schedules');
        } finally {
            setLoading(false);
        }
    };

    const getCourse = async (courseId) => {
        try {
            if (!courses[courseId]) {
                const response = await fetch(`api/Courses/${courseId}`, localStorage.getItem('authToken'));
                setCourses((prevCourses) => ({ ...prevCourses, [courseId]: response }));
            }
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };

    const getInstructor = async (instructorId) => {
        try {
            if (!instructors[instructorId]) {
                const response = await fetch(`api/Instructors/${instructorId}`, localStorage.getItem('authToken'));
                setInstructors((prevInstructors) => ({ ...prevInstructors, [instructorId]: response }));
            }
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    };

    useEffect(() => {
        getSchedules();
    }, []);

    useEffect(() => {
        schedules.forEach((schedule) => getCourse(schedule.courseId));
        if (localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Instructor') {
            schedules.forEach((schedule) => getInstructor(schedule.instructorId));
        }
    });

    const handleAddSchedule = () => {
        window.location.href = '/add-schedule';
      };

    const handleEditSchedule = (id) => {
        window.location.href = `/edit-schedule/${id}`;
    };

    const handleDeleteSchedule = async (id) => {
        try {
            await fetchDelete(`api/Schedules/${id}`, localStorage.getItem('authToken'));
            getSchedules();
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    }
    return (
        <div className="main-container">
            <div className='content-container'>
                <h1>Schedules</h1>
                {localStorage.getItem('role') === 'Admin' ? (
                    <button className='btn' onClick={handleAddSchedule}>Add Student</button>
                ) : null}
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <div className="cards-container">
                    {schedules.map((schedule) => (
                        <div key={schedule.scheduleId} className="card">
                            {localStorage.getItem('role') === 'Admin' ? (
                                <p>Schedule ID: {schedule.scheduleId}</p>
                            ) : null}

                            <p>Course Title: <strong>{courses[schedule.courseId]?.title || 'Loading course...'}</strong></p>
                            {localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === "Instructor" ? (
                                <p>Instructor Name: {instructors[schedule.instructorId]?.name || 'Loading instructor...'}</p>
                            ) : null}
                            <p>Room number: {schedule.roomId}</p>
                            <p>Date: {schedule.date}</p>
                            <p>Time Slot: {schedule.timeSlot}</p>
                            {localStorage.getItem('role') === 'Admin' ? (
                                <div>
                                    <button className='btn' onClick={() => handleEditSchedule(schedule.scheduleId)}>Edit Schedule</button>
                                    <button className='btn' onClick={() => handleDeleteSchedule(schedule.scheduleId)}>Delete Schedule</button>
                                </div>
                            ) : null
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Schedules;
