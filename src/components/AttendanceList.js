import React from 'react';
import '../styles/AttendanceList.css';

function AttendanceList({ records, onEdit, onDelete }) {
  return (
    <table className="attendance-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.length === 0 ? (
          <tr><td colSpan="4">No records found</td></tr>
        ) : (
          records.map((record, idx) => (
            <tr key={idx}>
              <td>{record.date}</td>
              <td>{record.checkIn}</td>
              <td>{record.checkOut}</td>
              <td>
                <button onClick={() => onEdit(record)}>Edit</button>
                <button onClick={() => onDelete(idx)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default AttendanceList;