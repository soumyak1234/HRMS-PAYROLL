// src/components/EmployeeFormModal.js
import React, { useState, useEffect } from 'react';
import '../styles/EmployeeFormModal.css';

function EmployeeFormModal({ isOpen, onClose, onSave, editableEmployee }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    phone: '',
    doj: '',
    status: 'Active',
  });

  useEffect(() => {
    if (editableEmployee) {
      setFormData(editableEmployee);
    } else {
      setFormData({
        name: '',
        email: '',
        department: '',
        role: '',
        phone: '',
        doj: '',
        status: 'Active',
      });
    }
  }, [editableEmployee]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);       // Pass data to parent
    onClose();              // Close modal after submit
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editableEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
          />
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input
            name="doj"
            value={formData.doj}
            onChange={handleChange}
            placeholder="Date of Joining (YYYY-MM-DD)"
            required
          />
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeFormModal;
