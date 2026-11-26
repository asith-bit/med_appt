# StayHealthy – Medical Appointment Booking (Front-End Capstone)

StayHealthy is a non-profit healthcare platform that connects patients with doctors anytime and from anywhere. Patients can sign up, log in, search for doctors by speciality, book appointments or instant consultations, get appointment notifications, give reviews, manage their profile and view their reports.

## Features

- Navbar with Home, Appointments, Instant Consultation, Reviews, Sign Up, Login and Logout
- Sign Up and Login connected to the backend API
- Find doctors by speciality and book appointments (name, phone, date and time)
- Instant consultation (name and phone only)
- Appointment notification on every page, removed on cancel
- Reviews with a 5-star rating, one review per consultation
- Profile card with editable name and phone number
- Reports page to view and download the patient report
- SEO meta tags and a production build

## Tech stack

React, React Router, HTML, CSS, JavaScript, Node.js / Express (server)

## Setup instructions

1. Clone the repository
   ```bash
   git clone https://github.com/asith-bit/grihf-frontend_capstone_starter_code.git
   cd grihf-frontend_capstone_starter_code/stayhealthy
   ```
2. Install and start the backend server (port 8181)
   ```bash
   cd server
   npm install
   node index.js
   ```
3. In a new terminal, install and start the React app (port 3000)
   ```bash
   cd stayhealthy
   npm install
   npm start
   ```
4. Create a production build
   ```bash
   npm run build
   ```

## Author

Asith Ahamed S
