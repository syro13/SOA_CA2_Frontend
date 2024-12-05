import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetch, fetchDelete } from '../services/api';

Modal.setAppElement('#root');

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('api/Students', sessionStorage.getItem('authToken'));
      setStudents(response);
    } catch (error) {
      setError('Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudent = async (id) => {
    console.log('Viewing student:', id);
    try {
      const response = await fetch(`api/Students/${id}`, sessionStorage.getItem('authToken'));
      setSelectedStudent(response);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error viewing student:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStudent(null);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleAddStudent = () => {
    console.log('Adding student');
    window.location.href = '/add-student';
  };

  const handleEditStudent = (id) => {
    console.log('Editing student:', id);
    window.location.href = `/edit-student/${id}`;
  };

  const handleDeleteStudent = async (id) => {
    console.log('Deleting student:', id);
    try {
      await fetchDelete(`api/Students/${id}`, sessionStorage.getItem('authToken'));
      getStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="main-container">
      <div className='content-container'>
        <h1>Students</h1>
        {sessionStorage.getItem('role') === 'Admin' ? (
          <button className='btn' onClick={handleAddStudent}>Add Student</button>
        ) : null}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className='cards-container'>
          {students.map((student) => (
            <div key={student.studentId} className="card" onClick={() => handleViewStudent(student.studentId)}>
              <h3>{student.name}</h3>
              <p>{student.email}</p>
              {sessionStorage.getItem('role') === 'Admin' ? (
                <div>
                  <button className='btn' onClick={() => handleEditStudent(student.studentId)}>Edit Student</button>
                  <button className='btn' onClick={() => handleDeleteStudent(student.studentId)}>Delete Student</button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Student Details"
          className='modal'
        >
          {selectedStudent && (
            <div className='modal-container'>
              <h2>{selectedStudent.name}</h2>
              <p>{selectedStudent.email}</p>
              <button className='btn' onClick={closeModal}>Close</button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Students;
