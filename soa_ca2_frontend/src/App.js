import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './pages/About';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the Home Page.</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
