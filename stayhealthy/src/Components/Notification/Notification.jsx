import React, { useEffect, useState } from 'react';
import './Notification.css';

// Reads all booked appointments saved by DoctorCard from localStorage.
const getAppointments = () =>
  Object.keys(localStorage)
    .filter((key) => key.startsWith('appointment-'))
    .map((key) => JSON.parse(localStorage.getItem(key)));

// Shows a banner with the user's upcoming appointment on every page.
// It disappears automatically when the appointment is cancelled.
const Notification = ({ children }) => {
  const [appointments, setAppointments] = useState(getAppointments());
  const [username, setUsername] = useState(sessionStorage.getItem('name') || '');

  useEffect(() => {
    const refresh = () => {
      setAppointments(getAppointments());
      setUsername(sessionStorage.getItem('name') || '');
    };
    window.addEventListener('appointment-change', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('appointment-change', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const latest = appointments[appointments.length - 1];

  return (
    <>
      {children}
      {latest && (
        <div className="notification" role="status">
          <div className="notification__header">
            <span className="notification__icon">📅</span>
            <h3>Appointment Details</h3>
          </div>
          <p><strong>User:</strong> {username || latest.name}</p>
          <p><strong>Doctor:</strong> {latest.doctorName}</p>
          <p><strong>Speciality:</strong> {latest.doctorSpeciality}</p>
          <p><strong>Name:</strong> {latest.name}</p>
          <p><strong>Phone Number:</strong> {latest.phoneNumber}</p>
          {latest.date && <p><strong>Date:</strong> {latest.date}</p>}
          {latest.time && <p><strong>Time:</strong> {latest.time}</p>}
          {appointments.length > 1 && (
            <p className="notification__more">+{appointments.length - 1} more appointment(s)</p>
          )}
        </div>
      )}
    </>
  );
};

export default Notification;
