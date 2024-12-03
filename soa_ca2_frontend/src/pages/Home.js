import React from 'react';

function Home() {
  return (
    <div className="main-container">
        <div className='content-container'>
        <h1>Welcome to the Course Management System</h1>
        <p>
          Our Educational Course Management System is designed to streamline the process of managing educational courses. Whether you are an administrator looking to manage course offerings or a student seeking to explore available courses, our system provides an intuitive and efficient solution.
        </p>
        <p>
          <strong>Features:</strong>
        </p>
        <ul style={{ listStyleType: 'none'}}>
          <li>Administrators can add, edit, and delete courses.</li>
          <li>Students can view detailed information about available courses.</li>
          <li>Responsive and user-friendly interface built with React.</li>
          <li>Secure and robust backend powered by a RESTful API.</li>
        </ul>
        <p>
          Get started by navigating through the menu to explore the various functionalities of our system. We are committed to providing a seamless and efficient experience for all users.
        </p>
      </div>
    </div>
  );
  }

export default Home;