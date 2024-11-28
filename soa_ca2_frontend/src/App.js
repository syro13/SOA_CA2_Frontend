import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Register from './pages/Register';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    navigate('/login');
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
      </Routes>
    </div>
  );
}

export default App;
