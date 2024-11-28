import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchCourses } from '../services/api'; // Adjust the import path as needed

Modal.setAppElement('#root'); // Set the app element for accessibility

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getCourses = async () => {
    setLoading(true);
    try {
      const response = await fetchCourses('api/Courses', localStorage.getItem('authToken'));
      setCourses(response);
    } catch (error) {
      setError('Error fetching courses');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = async (id) => {
    console.log('Viewing course:', id);
    try {
      const response = await fetchCourses(`api/Courses/${id}`, localStorage.getItem('authToken'));
      setSelectedCourse(response);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error viewing course:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCourse(null);
  };

  // useEffect(() => {
  //   getCourses();
  // }, []);


  return (
    <div className="main-container">
      <h1>Courses Page</h1>
      <p>Welcome to the Courses Page!</p>
      <button className='btn' onClick={getCourses}>Get Courses</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='cards-container'>
        {courses.map((course) => (
          <div key={course.courseId} className="card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>Credits:</strong> {course.credits}</p>
            {localStorage.getItem('role') === 'Admin' ? (
              <button className='btn' onClick={() => handleViewCourse(course.courseId)}>View Course</button>
            ) : null
              }
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Course Details"
      >
        {selectedCourse && (
          <div>
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            <p><strong>Credits:</strong> {selectedCourse.credits}</p>
            <button className='btn' onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Courses;