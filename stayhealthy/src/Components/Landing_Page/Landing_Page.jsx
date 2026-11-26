import React from 'react';
import { Link } from 'react-router-dom';
import './Landing_Page.css';

const Landing_Page = () => (
  <section className="hero-section">
    <h1>
      Your Health<br />
      <span className="text-gradient">Our Responsibility</span>
    </h1>
    <h4>
      Book appointments with trusted doctors, get instant consultations and keep
      track of your care, all in one place.
    </h4>
    <Link to="/booking-consultation" className="btn btn--primary hero-btn">Get Started</Link>
  </section>
);

export default Landing_Page;
