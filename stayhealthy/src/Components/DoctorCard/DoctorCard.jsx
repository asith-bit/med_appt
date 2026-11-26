import React, { useEffect, useState } from 'react';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import AppointmentFormIC from '../InstantConsultation/AppointmentFormIC/AppointmentFormIC';
import './DoctorCard.css';

const initials = (name) =>
  name.replace('Dr. ', '').split(' ').map((w) => w[0]).join('').slice(0, 2);

// Shows a doctor's details and lets the user book / cancel an appointment.
const DoctorCard = ({ name, speciality, experience, ratings, instant = false }) => {
  const storageKey = `appointment-${name}`;
  const [showForm, setShowForm] = useState(false);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setAppointment(JSON.parse(saved));
  }, [storageKey]);

  const handleBook = (details) => {
    const booked = { id: Date.now(), doctorName: name, doctorSpeciality: speciality, ...details };
    localStorage.setItem(storageKey, JSON.stringify(booked));
    setAppointment(booked);
    setShowForm(false);
    window.dispatchEvent(new Event('appointment-change'));
  };

  // Cancel appointment: remove it from storage and state so the
  // Notification component also stops showing it.
  const handleCancel = () => {
    localStorage.removeItem(storageKey);
    setAppointment(null);
    // Tell the Notification component to remove this appointment
    window.dispatchEvent(new Event('appointment-change'));
  };

  const stars = '\u2605'.repeat(Math.round(ratings));

  return (
    <div className="doctor-card">
      <div className="doctor-card__avatar">{initials(name)}</div>
      <h3>{name}</h3>
      <p className="doctor-card__speciality">{speciality}</p>
      <p className="doctor-card__meta">{experience} years experience</p>
      <p className="doctor-card__rating">{stars} {ratings}</p>

      {appointment ? (
        <div className="doctor-card__booked">
          <p><strong>Appointment booked</strong></p>
          <p>{appointment.date ? `${appointment.date} at ${appointment.time}` : 'Instant consultation'}</p>
          <p>Patient: {appointment.name}</p>
          <button className="btn btn--danger doctor-card__btn" onClick={handleCancel}>
            Cancel Appointment
          </button>
        </div>
      ) : showForm ? (
        instant ? (
          <AppointmentFormIC doctorName={name} onSubmit={handleBook} onCancel={() => setShowForm(false)} />
        ) : (
          <AppointmentForm doctorName={name} onSubmit={handleBook} onCancel={() => setShowForm(false)} />
        )
      ) : (
        <button className="btn btn--primary doctor-card__btn" onClick={() => setShowForm(true)}>
          Book Appointment
          <span>No Booking Fee</span>
        </button>
      )}
    </div>
  );
};

export default DoctorCard;
