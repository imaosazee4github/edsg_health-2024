import React from 'react';
import './Header.css';
import mhlogo from '../assets/edlogo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={mhlogo} alt="App Logo" />
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/create-quiz">Create Quiz</a></li>
          <li><a href="/submissions">Submissions</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
