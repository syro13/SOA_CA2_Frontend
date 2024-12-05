import React from 'react';

function About() {
  return (
    <div className="main-container">
      <div className='content-container'>
        <div className='content-section'>
          <div className='content-img'>
            <img src="/college-students-1.jpg" />
          </div>
          <div className='content-text'>
            <h1>About Us</h1>
            <p>
              This project is a Educational Course Management System designed to help institutions manage their courses efficiently.
              It allows administrators to add, edit, and delete courses, while students can view available courses and their details.
              The system is built using React for the frontend and a RESTful API for the backend, ensuring a seamless and responsive user experience.
            </p>
            <p>By Jakub Lowis & Erling Eduardo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
