import React, { useState } from 'react';
import './GiveReviews.css';

const consultations = [
  { id: 1, doctorName: 'Dr. Priya Raman', speciality: 'Dentist' },
  { id: 2, doctorName: 'Dr. Rahul Iyer', speciality: 'General Physician' },
  { id: 3, doctorName: 'Dr. Kavya Nair', speciality: 'Dermatologist' },
];

const loadReviews = () => JSON.parse(localStorage.getItem('reviews') || '{}');

// Lists the patient's consultations. "Click Here" opens the feedback form.
// After a review is submitted, that row's button is disabled so the user
// can give only one review per consultation.
const GiveReviews = () => {
  const [reviews, setReviews] = useState(loadReviews());
  const [active, setActive] = useState(null);

  // Form fields
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState('');

  const openForm = (consultation) => {
    setActive(consultation);
    setReview('');
    setRating(0);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !review || rating === 0) {
      setError('Please fill out all fields and select a rating.');
      return;
    }
    const updated = { ...reviews, [active.id]: { name, review, rating } };
    localStorage.setItem('reviews', JSON.stringify(updated));
    setReviews(updated); // this disables the button for this consultation
    setActive(null);
  };

  return (
    <main className="reviews">
      <h1>Reviews</h1>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((c) => {
            const given = reviews[c.id];
            return (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.doctorName}</td>
                <td>{c.speciality}</td>
                <td>
                  <button className="btn btn--primary" disabled={!!given} onClick={() => openForm(c)}>
                    {given ? 'Review Submitted' : 'Click Here'}
                  </button>
                </td>
                <td className="reviews__given">
                  {given ? <>{'\u2605'.repeat(given.rating)} &ndash; {given.review}</> : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {active && (
        <div className="review-overlay">
          <form className="review-form" onSubmit={handleSubmit}>
            <h2>Give Your Feedback</h2>
            <p className="review-form__doctor">for {active.doctorName}</p>
            <div className="form-group">
              <label htmlFor="review-name">Name</label>
              <input id="review-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="review-text">Review</label>
              <textarea id="review-text" rows="4" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Tell us about your consultation" />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="rating-selector" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={star <= (hover || rating) ? 'star filled' : 'star'}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    ★
                  </button>
                ))}
                <span className="rating-selector__value">{rating ? `${rating}/5` : 'Select'}</span>
              </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <div className="form-actions">
              <button type="submit" className="btn btn--primary">Submit</button>
              <button type="button" className="btn btn--outline" onClick={() => setActive(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default GiveReviews;
