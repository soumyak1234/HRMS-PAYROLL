// TimeTab.js
import React, { useState, useEffect } from 'react';
import AttendanceFormModal from '../components/AttendanceFormModal';
import AttendanceList from '../components/AttendanceList';
import '../styles/TimePage.css';


const defaultAttendance = [
  { id: 1, name: 'Chinmaya Kumar Nayak', department: 'HR', clockIn: '09:00 AM', clockOut: '06:00 PM', status: 'Present' },
  { id: 2, name: 'Soumyak Ranjan Behera', department: 'Finance', clockIn: '', clockOut: '', status: 'Absent' },
  { id: 3, name: 'Anita Patra', department: 'Engineering', clockIn: '09:15 AM', clockOut: '05:50 PM', status: 'Present' },
  { id: 4, name: 'Biswajit Bhadra', department: 'Marketing', clockIn: '', clockOut: '', status: 'Leave' },
];

function TimePage() {
  const [records, setRecords] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [editableAttendance, setEditableAttendance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    clockIn: '',
    clockOut: '',
    status: 'Present'
  });

  useEffect(() => {
    setAttendance(defaultAttendance);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddAttendance = () => {
    const newRecord = {
      ...formData,
      id: attendance.length ? Math.max(...attendance.map(a => a.id)) + 1 : 1
    };
    setAttendance(prev => [...prev, newRecord]);
    setFormData({ name: '', department: '', clockIn: '', clockOut: '', status: 'Present' });
    setShowModal(false);
  };

  return (
    <div className="time-tab">
      <div className="time-header">
        <h2>Time Tracking</h2>
        <button className="add-attendance-btn" onClick={() => setShowModal(true)}>
          + Add Attendance
        </button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length === 0 ? (
            <tr><td colSpan="5">No attendance records available.</td></tr>
          ) : (
            attendance.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.clockIn || '-'}</td>
                <td>{emp.clockOut || '-'}</td>
                <td>{emp.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Attendance</h3>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
            <input name="clockIn" value={formData.clockIn} onChange={handleChange} placeholder="Clock In (e.g., 09:00 AM)" />
            <input name="clockOut" value={formData.clockOut} onChange={handleChange} placeholder="Clock Out (e.g., 06:00 PM)" />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleAddAttendance}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimePage;
