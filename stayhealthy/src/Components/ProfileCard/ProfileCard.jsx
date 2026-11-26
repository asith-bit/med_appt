import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { authHeader } from '../../Setauthtoken';
import './ProfileCard.css';

// Shows the logged-in user's details and lets them update name and phone number.
const ProfileCard = () => {
  const [profile, setProfile] = useState({
    name: sessionStorage.getItem('name') || '',
    email: sessionStorage.getItem('email') || '',
    phone: sessionStorage.getItem('phone') || '',
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load the latest details from the server
  useEffect(() => {
    if (!sessionStorage.getItem('auth-token')) return;
    fetch(`${API_URL}/api/auth/user`, { headers: authHeader() })
      .then((res) => (res.ok ? res.json() : null))
      .then((user) => {
        if (user) {
          const data = { name: user.name, email: user.email, phone: user.phone };
          setProfile(data);
          setForm(data);
        }
      })
      .catch(() => {});
  }, []);

  if (!sessionStorage.getItem('auth-token')) return <Navigate to="/login" />;

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^[0-9]{10}$/.test(form.phone)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ name: form.name, phone: form.phone }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Could not update profile.');
        return;
      }
      sessionStorage.setItem('name', json.name);
      sessionStorage.setItem('phone', json.phone);
      setProfile({ ...profile, name: json.name, phone: json.phone });
      setEditing(false);
      setMessage('Profile updated successfully.');
      window.dispatchEvent(new Event('profile-change'));
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Could not reach the server.');
    }
  };

  const initials = profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-card__avatar">{initials || '?'}</div>
        <h1>Welcome, {profile.name}</h1>
        {message && <p className="profile-card__message">{message}</p>}

        {editing ? (
          <form onSubmit={handleSave} className="profile-card__form">
            <div className="form-group">
              <label htmlFor="profile-name">Name</label>
              <input id="profile-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label htmlFor="profile-email">Email</label>
              <input id="profile-email" type="email" value={form.email} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="profile-phone">Phone Number</label>
              <input id="profile-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
            {error && <p className="form-error">{error}</p>}
            <div className="form-actions">
              <button type="submit" className="btn btn--primary">Save</button>
              <button type="button" className="btn btn--outline" onClick={() => { setForm(profile); setEditing(false); setError(''); }}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <dl className="profile-card__details">
              <dt>Name</dt><dd>{profile.name}</dd>
              <dt>Email</dt><dd>{profile.email}</dd>
              <dt>Phone Number</dt><dd>{profile.phone}</dd>
            </dl>
            <button className="btn btn--primary profile-card__edit" onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>
    </main>
  );
};

export default ProfileCard;
