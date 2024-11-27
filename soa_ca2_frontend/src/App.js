import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
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
        </ul>
        </div>
        <div class="loginContainer">
        {localStorage.getItem('isLoggedIn') ? (
          <button className="btn" onClick={handleLogout}>Logout</button>
        ):(
          <Link to="/login" className="btn">Login</Link>
        )}
        </div>
      </div>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
}

export default App;
