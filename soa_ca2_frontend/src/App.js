import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Register from './pages/Register';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';
import Instructors from './pages/Instructors';
import AddInstructor from './pages/AddInstructor';
import EditInstructor from './pages/EditInstructor';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import Schedules from './pages/Schedules';
import AddSchedule from './pages/AddSchedule';
import EditSchedule from './pages/EditSchedule';
import Footer from './pages/Footer';

import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload();
  };

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div class="nav">
        <div class="nav-links">
          <Link to="/">Home</Link>
          {location.pathname === '/' ? (
          <Link onClick={() => handleScrollToSection('about')}>About</Link>
          ) : null}
          {localStorage.getItem('isLoggedIn') ? (
              <><Link to="/courses">Courses</Link><Link to="/schedules">Schedules</Link></>

          ) : null}
          {(localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Instructor') ? (
              <><Link to="/instructors">Instructors</Link><Link to="/students">Students</Link></>
          ) : null}
        </div>
        <div class="loginContainer">
          {localStorage.getItem('isLoggedIn') ? (
            <Link className="btn" onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/login" className="btn">Login</Link>
          )}
          {localStorage.getItem('role') === 'Admin' ? (
            <Link to="/register" className="btn">Register New Users</Link>
          ) : (
            null
          )}
        </div>
      </div>




      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:id" element={<EditCourse />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/add-instructor" element={<AddInstructor />} />
        <Route path="/edit-instructor/:id" element={<EditInstructor />} />
        <Route path="/students" element={<Students />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/add-schedule" element={<AddSchedule />} />
        <Route path="/edit-schedule/:id" element={<EditSchedule />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
