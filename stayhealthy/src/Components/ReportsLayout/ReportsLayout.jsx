import React from 'react';
import './ReportsLayout.css';

const reports = [
  { id: 1, doctorName: 'Dr. Priya Raman', speciality: 'Dentist', file: '/patient_report.pdf' },
  { id: 2, doctorName: 'Dr. Rahul Iyer', speciality: 'General Physician', file: '/patient_report.pdf' },
  { id: 3, doctorName: 'Dr. Kavya Nair', speciality: 'Dermatologist', file: '/patient_report.pdf' },
];

// Lists the patient's consultation reports with View and Download options.
const ReportsLayout = () => (
  <main className="reports">
    <h1>Reports</h1>
    <table>
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Doctor Name</th>
          <th>Doctor Speciality</th>
          <th>View Report</th>
          <th>Download Report</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.doctorName}</td>
            <td>{r.speciality}</td>
            <td>
              <a href={r.file} target="_blank" rel="noopener noreferrer" className="btn btn--primary">View Report</a>
            </td>
            <td>
              <a href={r.file} download className="btn btn--outline">Download Report</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
);

export default ReportsLayout;
