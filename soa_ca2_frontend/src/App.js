import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Register from './pages/Register';
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
        {localStorage.getItem('isLoggedIn') && localStorage.getItem('role') === "Admin" ? (
          <div>
              <button className="btn" onClick={handleLogout}>Logout</button>
              <Link to="/register" className="btn">Register</Link>
          </div>
        ):(
          <div>
          <Link to="/login" className="btn">Login</Link>
          </div>
        )}
        </div>
      </div>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
}

export default App;
