import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
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
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div>
      <div class="nav" style={{backgroundColor:'red'}}>
        <div class="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {localStorage.getItem('isLoggedIn') ? (
            <li>
              <Link to="/courses">Courses</Link>
              <Link to="/students">Students</Link>
            </li>
          ) : null}
          {(localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Instructor') ? (
              <li>
                <Link to="/instructors">Instructors</Link>
              </li>
              ) : null}
        </ul>
        </div>
        <div class="loginContainer">
        {localStorage.getItem('isLoggedIn') ? (
              <button className="btn" onClick={handleLogout}>Logout</button>
        ):(
              <Link to="/login" className="btn">Login</Link>
        )}
        {localStorage.getItem('role') === 'Admin' ? (
              <Link to="/register" className="btn">Register</Link>
        ):(
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
      </Routes>
    </div>
  );
}

export default App;
