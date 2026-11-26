import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';
import doctors from '../../doctors';
import './BookingConsultation.css';

// Appointments page: search a speciality, then book with a doctor.
const BookingConsultation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [speciality, setSpeciality] = useState(searchParams.get('speciality') || '');

  const handleSearch = (value) => {
    setSpeciality(value);
    setSearchParams({ speciality: value });
  };

  const results = speciality
    ? doctors.filter((d) => d.speciality.toLowerCase() === speciality.toLowerCase())
    : doctors;

  return (
    <main className="booking">
      <FindDoctorSearch onSearch={handleSearch} />
      <h2 className="booking__title">
        {speciality
          ? `${results.length} doctor${results.length === 1 ? '' : 's'} available for "${speciality}"`
          : `${results.length} doctors available`}
      </h2>
      <section className="booking__list">
        {results.map((doctor) => <DoctorCard key={doctor.name} {...doctor} />)}
      </section>
    </main>
  );
};

export default BookingConsultation;
