import React, { useState } from 'react';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';
import doctors from '../../doctors';
import './InstantConsultation.css';

// Instant Consultation: find a doctor who is available right now.
const InstantConsultation = () => {
  const [speciality, setSpeciality] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (value) => {
    setSpeciality(value);
    setSearched(true);
  };

  const results = doctors.filter(
    (d) => d.speciality.toLowerCase() === speciality.toLowerCase()
  );

  return (
    <main className="instant">
      <div className="instant__banner">
        <span className="instant__dot" /> Doctors available online now
      </div>
      <FindDoctorSearch title="Instant Consultation" onSearch={handleSearch} />
      {searched && (
        <>
          <h2 className="instant__title">
            {results.length} doctor{results.length === 1 ? '' : 's'} available for an instant consultation in "{speciality}"
          </h2>
          <section className="instant__list">
            {results.length > 0
              ? results.map((doctor) => <DoctorCard key={doctor.name} {...doctor} instant />)
              : <p className="instant__empty">No doctors found. Try another speciality.</p>}
          </section>
        </>
      )}
    </main>
  );
};

export default InstantConsultation;
