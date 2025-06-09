// src/components/LeaveFormModal.js
import React, { useState, useEffect } from 'react';
import '../styles/LeavePage.css';

function LeaveFormModal({ isOpen, onClose, onSave, editableLeave }) {
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    days: 0,
    status: 'Pending',
    reason: '',
  });

  useEffect(() => {
    if (editableLeave) {
      setFormData(editableLeave);
    } else {
      setFormData({
        employeeName: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Pending',
        reason: '',
      });
    }
  }, [editableLeave]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'startDate' || name === 'endDate') {
      const start = name === 'startDate' ? new Date(value) : new Date(formData.startDate);
      const end = name === 'endDate' ? new Date(value) : new Date(formData.endDate);
      if (start && end && start <= end) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setFormData((prev) => ({ ...prev, days: diffDays }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editableLeave ? 'Edit Leave' : 'Add Leave'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            placeholder="Employee Name"
            required
          />
          <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Earned Leave">Earned Leave</option>
            <option value="Other">Other</option>
          </select>
          <input
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <input
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
          <input
            name="days"
            type="number"
            value={formData.days}
            readOnly
            placeholder="Number of Days"
          />
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
            required
          ></textarea>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeaveFormModal;