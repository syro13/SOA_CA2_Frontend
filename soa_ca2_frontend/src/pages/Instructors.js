import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetch, fetchDelete } from '../services/api';

Modal.setAppElement('#root');

const Instructors = () => {
  const [instructors, setInstructor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getInstructors = async () => {
    setLoading(true);
    try {
      const response = await fetch('api/Instructors', localStorage.getItem('authToken'));
      setInstructor(response);
    } catch (error) {
      setError('Error fetching instructors');
    } finally {
      setLoading(false);
    }
  };

  const handleViewInstructor = async (id) => {
    console.log('Viewing instructor:', id);
    try {
      const response = await fetch(`api/Instructors/${id}`, localStorage.getItem('authToken'));
      setSelectedInstructor(response);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error viewing instructor:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedInstructor(null);
  };

  useEffect(() => {
    getInstructors();
  }, []);

  const handleAddInstructor = () => {
    console.log('Adding instructor');
    window.location.href = '/add-instructor';
  };

  const handleEditInstructor = (id) => {
    console.log('Editing instructor:', id);
    window.location.href = `/edit-instructor/${id}`;
  };

  const handleDeleteInstructor = async (id) => {
    console.log('Deleting instructor:', id);
    try {
      await fetchDelete(`api/Instructors/${id}`, localStorage.getItem('authToken'));
      getInstructors();
    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  }


  return (
    <div className="main-container">
        <div className='content-container'>
      <h1>Instructors</h1>
      {localStorage.getItem('role') === 'Admin' ? (
              <button className='btn' onClick={handleAddInstructor}>Add Instructor</button>
            ) : null
              }
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='cards-container'>
        {instructors.map((instructor) => (
          <div key={instructor.instructorId} className="card">
            <h3>{instructor.name}</h3>
            <p>{instructor.email}</p>
            <button className='btn' onClick={() => handleViewInstructor(instructor.instructorId)}>View Instructor</button>
            {localStorage.getItem('role') === 'Admin' ? (
              <div>
              <button className='btn' onClick={() => handleEditInstructor(instructor.instructorId)}>Edit Instructor</button>
              <button className='btn' onClick={() => handleDeleteInstructor(instructor.instructorId)}>Delete Instructor</button>
              </div>
            ) : null
              }
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Instructor Details"
      >
        {selectedInstructor && (
          <div>
            <h2>{selectedInstructor.name}</h2>
            <p>{selectedInstructor.email}</p>
            <button className='btn' onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
      </div>
    </div>
  );
};

export default Instructors;