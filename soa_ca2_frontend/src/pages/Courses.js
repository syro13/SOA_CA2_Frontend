import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetch, fetchDelete } from '../services/api';

Modal.setAppElement('#root');

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('api/Courses', localStorage.getItem('authToken'));
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
      const response = await fetch(`api/Courses/${id}`, localStorage.getItem('authToken'));
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

  useEffect(() => {
    getCourses();
  }, []);

  const handleAddCourse = () => {
    console.log('Adding course');
    window.location.href = '/add-course';
  };

  const handleEditCourse = (id) => {
    console.log('Editing course:', id);
    window.location.href = `/edit-course/${id}`;
  };

  const handleDeleteCourse = async (id) => {
    console.log('Deleting course:', id);
    try {
      await fetchDelete(`api/Courses/${id}`, localStorage.getItem('authToken'));
      getCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }


  return (
    <div className="main-container">
        <div className='content-container'>
      <h1>Explore the Courses</h1>
      {localStorage.getItem('role') === 'Admin' ? (
              <button className='btn' onClick={handleAddCourse}>Add Course</button>
            ) : null
              }
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='cards-container' >
        {courses.map((course) => (
          <div key={course.courseId} className="card" onClick={() => handleViewCourse(course.courseId)}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>Credits:</strong> {course.credits}</p>
            {localStorage.getItem('role') === 'Admin' ? (
              <><button className='btn' onClick={() => handleEditCourse(course.courseId)}>Edit Course</button><button className='btn' onClick={() => handleDeleteCourse(course.courseId)}>Delete Course</button></>
            ) : null
              }
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Course Details"
        className='modal'
      >
        {selectedCourse && (
          <div className='modal-container'>
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            <p><strong>Credits:</strong> {selectedCourse.credits}</p>
            <button className='btn' onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
      </div>
    </div>
  );
};

export default Courses;