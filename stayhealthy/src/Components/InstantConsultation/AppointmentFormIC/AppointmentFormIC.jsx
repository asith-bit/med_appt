import React, { useState } from 'react';
import './AppointmentFormIC.css';

// Instant consultation form: only Name and Phone Number are needed,
// because the consultation starts right away (no date or time slot).
const AppointmentFormIC = ({ doctorName, onSubmit, onCancel }) => {
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [phoneNumber, setPhoneNumber] = useState(sessionStorage.getItem('phone') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber });
    setName('');
    setPhoneNumber('');
  };

  return (
    <form className="appointment-form-ic" onSubmit={handleSubmit}>
      <h3>Instant consultation with {doctorName}</h3>
      <div className="form-group">
        <label htmlFor="ic-name">Name</label>
        <input id="ic-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="ic-phone">Phone Number</label>
        <input id="ic-phone" type="tel" pattern="[0-9]{10}" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn--primary">Book Now</button>
        <button type="button" className="btn btn--outline" onClick={onCancel}>Close</button>
      </div>
    </form>
  );
};

export default AppointmentFormIC;
