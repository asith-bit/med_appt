import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import setAuthToken from '../../Setauthtoken';
import './Sign_Up.css';

const Sign_Up = () => {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = () => {
    setRole(''); setName(''); setPhone(''); setEmail(''); setPassword(''); setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^[0-9]{10}$/.test(phone)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, name, phone, email, password }),
      });
      const json = await response.json();
      if (json.authtoken) {
        setAuthToken({ token: json.authtoken, name, email, phone });
        navigate('/');
      } else {
        setError(json.error || 'Sign up failed. Please try again.');
      }
    } catch (err) {
      setError('Could not reach the server. Make sure the server is running.');
    }
  };

  return (
    <main className="form-page">
      <div className="form-card">
        <h1>Sign Up</h1>
        <p className="sub">Already a member? <Link to="/login">Login</Link></p>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" minLength={8} required />
          </div>
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="btn btn--primary">Submit</button>
            <button type="reset" className="btn btn--outline">Reset</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Sign_Up;
