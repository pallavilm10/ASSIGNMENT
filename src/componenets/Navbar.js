import React from 'react';
import './style.css';
import iconImage from './logo.jpg'; // Replace with the actual path to your image file

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-section">
        <i className="icon">
        <img src={iconImage} alt="Icon" style={{ width: '50px', height: '20px' }} />
        </i>
      </div>
      <div className="right-section">
        <a href="#portfolio">Portfolio</a>
        <a href="#inbox">Inbox</a>
        <a href="#tasks">My Tasks</a>
        <a href="#help">Help</a>
        <a href="#account">Account</a>
      </div>
    </nav>
  );
}