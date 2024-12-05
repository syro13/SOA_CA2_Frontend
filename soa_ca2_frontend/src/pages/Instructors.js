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
      const response = await fetch('api/Instructors', sessionStorage.getItem('authToken'));
      setInstructor(response);
    } catch (error) {
      setError('Error fetching instructors');
    } finally {
      setLoading(false);
    }
  };

  const handleViewInstructor = async (id) => {
    try {
      const response = await fetch(`api/Instructors/${id}`, sessionStorage.getItem('authToken'));
      setSelectedInstructor(response);
      setModalIsOpen(true);
    } catch (error) {
      throw error;
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
    window.location.href = '/add-instructor';
  };

  const handleEditInstructor = (id) => {
    window.location.href = `/edit-instructor/${id}`;
  };

  const handleDeleteInstructor = async (id) => {
    try {
      await fetchDelete(`api/Instructors/${id}`, sessionStorage.getItem('authToken'));
      getInstructors();
    } catch (error) {
      throw error;
    }
  }


  return (
    <div className="main-container">
        <div className='content-container'>
      <h1>Instructors</h1>
      {sessionStorage.getItem('role') === 'Admin' ? (
              <button className='btn' onClick={handleAddInstructor}>Add Instructor</button>
            ) : null
              }
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='cards-container'>
        {instructors.map((instructor) => (
          <div key={instructor.instructorId} className="card" onClick={() => handleViewInstructor(instructor.instructorId)}>
            <h3>{instructor.name}</h3>
            <p>{instructor.email}</p>
            {sessionStorage.getItem('role') === 'Admin' ? (
              <><button className='btn' onClick={() => handleEditInstructor(instructor.instructorId)}>Edit Instructor</button><button className='btn' onClick={() => handleDeleteInstructor(instructor.instructorId)}>Delete Instructor</button></>
            ) : null
              }
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Instructor Details"
        className='modal'
      >
        {selectedInstructor && (
          <div className='modal-container'>
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