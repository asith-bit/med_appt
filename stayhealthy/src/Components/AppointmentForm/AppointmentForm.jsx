import React, { useState } from 'react';
import './AppointmentForm.css';

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

// Form used inside DoctorCard to book an appointment with a doctor.
const AppointmentForm = ({ doctorName, onSubmit, onCancel }) => {
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [phoneNumber, setPhoneNumber] = useState(sessionStorage.getItem('phone') || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, date, time });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h3>Book with {doctorName}</h3>
      <div className="form-group">
        <label htmlFor="appt-name">Name</label>
        <input id="appt-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="appt-phone">Phone Number</label>
        <input id="appt-phone" type="tel" pattern="[0-9]{10}" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="appt-date">Date of Appointment</label>
        <input id="appt-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="appt-time">Book Time Slot</label>
        <select id="appt-time" value={time} onChange={(e) => setTime(e.target.value)} required>
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn--primary">Book Now</button>
        <button type="button" className="btn btn--outline" onClick={onCancel}>Close</button>
      </div>
    </form>
  );
};

export default AppointmentForm;
