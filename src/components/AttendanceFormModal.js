import React, { useState, useEffect } from 'react';
import '../styles/AttendanceFormModal.css';

function AttendanceFormModal({ isOpen, onClose, onSave, editableAttendance }) {
  const [formData, setFormData] = useState({
    date: '',
    checkIn: '',
    checkOut: '',
  });

  useEffect(() => {
    if (editableAttendance) {
      setFormData(editableAttendance);
    } else {
      setFormData({ date: '', checkIn: '', checkOut: '' });
    }
  }, [editableAttendance]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editableAttendance ? 'Edit Attendance' : 'Add Attendance'}</h3>
        <form onSubmit={handleSubmit}>
          <input name="date" type="date" value={formData.date} onChange={handleChange} required />
          <input name="checkIn" type="time" value={formData.checkIn} onChange={handleChange} required />
          <input name="checkOut" type="time" value={formData.checkOut} onChange={handleChange} required />
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendanceFormModal;