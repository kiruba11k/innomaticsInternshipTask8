import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // For styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://www.innomatics.in/wp-content/uploads/2023/01/Innomatics-Logo1.png" alt="Logo" className="logo" /> {/* Logo image */}
        {/* <h1>MyApp</h1> */}
      </div>

      <button className="toggle-button" onClick={toggleMenu}>
        ☰ {/* Menu icon */}
      </button>

      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <NavLink exact to="/" className="nav-link" activeClassName="active">
        Dashboard
        </NavLink>

        <NavLink to="/students" className="nav-link" activeClassName="active">
          Student List
        </NavLink>
        <NavLink to="/register" className="nav-link" activeClassName="active">
          Register Student
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
