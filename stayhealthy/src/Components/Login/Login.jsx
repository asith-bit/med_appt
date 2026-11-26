import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import setAuthToken from '../../Setauthtoken';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (json.authtoken) {
        setAuthToken({ token: json.authtoken, name: json.name, email, phone: json.phone });
        navigate('/');
      } else {
        setError(json.error || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Could not reach the server. Make sure the server is running.');
    }
  };

  return (
    <main className="form-page">
      <div className="form-card">
        <h1>Login</h1>
        <p className="sub">Are you a new member? <Link to="/signup">Sign Up Here</Link></p>
        <form onSubmit={handleSubmit} onReset={() => { setEmail(''); setPassword(''); setError(''); }}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>
          <a href="#forgot" className="form-link">Forgot Password?</a>
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="btn btn--primary">Login</button>
            <button type="reset" className="btn btn--outline">Reset</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
