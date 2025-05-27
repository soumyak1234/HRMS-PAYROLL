import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import HrLogo from '../components/Image/hrLogo.png'
import { FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={HrLogo} alt=''/>
        </div>
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
          <li><NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>Employees</NavLink></li>
          <li><NavLink to="/time" className={({ isActive }) => isActive ? 'active' : ''}>Time</NavLink></li>
          <li><NavLink to="/payroll" className={({ isActive }) => isActive ? 'active' : ''}>Payroll</NavLink></li>
        </ul>
      </div>
      <div className="navbar-right">
        <FaSearch className="icon" />
        <FaBell className="icon" />
        <FaUserCircle className="icon" />
      </div>
    </nav>
  );
}

export default Navbar;