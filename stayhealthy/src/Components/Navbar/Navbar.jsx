import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import setAuthToken from '../../Setauthtoken';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Re-check login state whenever the page changes
  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    setUserName(token ? sessionStorage.getItem('name') || 'User' : '');
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Update the name shown when the profile is edited
  useEffect(() => {
    const refresh = () => setUserName(sessionStorage.getItem('name') || '');
    window.addEventListener('profile-change', refresh);
    return () => window.removeEventListener('profile-change', refresh);
  }, []);

  const handleLogout = () => {
    setAuthToken();
    setUserName('');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav__logo">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#2190FF" />
          <path d="M13 7h6v6h6v6h-6v6h-6v-6H7v-6h6z" fill="#fff" />
        </svg>
        <span className="text-gradient">StayHealthy</span>
      </Link>

      <button
        className="nav__icon"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '\u2715' : '\u2630'}
      </button>

      <ul className={menuOpen ? 'nav__links active' : 'nav__links'}>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/booking-consultation">Appointments</NavLink></li>
        <li><NavLink to="/instant-consultation">Instant Consultation</NavLink></li>
        <li><NavLink to="/reviews">Reviews</NavLink></li>
        {userName ? (
          <>
            <li className="nav__profile">
              <button className="nav__welcome" onClick={() => setDropdownOpen(!dropdownOpen)}>
                Welcome, {userName} &#9662;
              </button>
              {dropdownOpen && (
                <ul className="nav__dropdown">
                  <li><Link to="/profile">Your Profile</Link></li>
                  <li><Link to="/reports">Your Reports</Link></li>
                </ul>
              )}
            </li>
            <li><button className="btn btn--outline" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signup" className="btn btn--primary">Sign Up</Link></li>
            <li><Link to="/login" className="btn btn--outline">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
