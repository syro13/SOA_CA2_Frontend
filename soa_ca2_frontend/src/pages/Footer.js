import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Footer() {
    return (
        <div className='footer'>
            <div className="footer-content-left">
                <img src="/brand-logo.png" alt="Logo" />
                <h2>Student Management System</h2>
            </div>
            <div className="footer-links">
                <h4>Explore</h4>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                {localStorage.getItem('isLoggedIn') ? (
                    <>
                        <Link to="/courses">Courses</Link>
                        <Link to="/schedules">Schedules</Link>
                    </>
                ) : null}
                {(localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Instructor') ? (
                    <>
                        <Link to="/instructors">Instructors</Link>
                        <Link to="/students">Students</Link>
                    </>
                ) : null}
            </div>
            <div className="footer-links">
                <h4>Legal</h4>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-of-service">Terms of Service</Link>
            </div>
            <div className="footer-content-right">
                <h4>Contact Information</h4>
                <p><strong>Phone:</strong> +1 987-654-3210</p>
                <p><strong>Email:</strong> support@example.com</p>
                <p><strong>Address:</strong> 456 Elm Street, Springfield, IL, USA</p>
                <p><strong>Working Hours:</strong> Mon-Fri: 9:00 AM - 6:00 PM</p>
            </div>
        </div>
    );
}

export default Footer;