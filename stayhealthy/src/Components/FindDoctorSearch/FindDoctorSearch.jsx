import React, { useState } from 'react';
import { specialities } from '../../doctors';
import './FindDoctorSearch.css';

// Search box with a dropdown of specialities. Calls onSearch(speciality).
const FindDoctorSearch = ({ title = 'Find a doctor at your own ease', onSearch }) => {
  const [text, setText] = useState('');
  const [showList, setShowList] = useState(false);

  const filtered = specialities.filter((s) =>
    s.toLowerCase().includes(text.toLowerCase())
  );

  const select = (speciality) => {
    setText(speciality);
    setShowList(false);
    onSearch(speciality);
  };

  return (
    <section className="finddoctor">
      <h1>{title}</h1>
      <p>Search by speciality and book an appointment in seconds.</p>
      <div className="finddoctor__box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          placeholder="Search doctors, clinics, hospitals, etc."
          value={text}
          onFocus={() => setShowList(true)}
          onBlur={() => setTimeout(() => setShowList(false), 150)}
          onChange={(e) => { setText(e.target.value); setShowList(true); }}
        />
        {showList && filtered.length > 0 && (
          <ul className="finddoctor__results">
            {filtered.map((s) => (
              <li key={s} onMouseDown={() => select(s)}>
                {s} <span>Speciality</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default FindDoctorSearch;
