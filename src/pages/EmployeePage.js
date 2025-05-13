import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeFormModal from '../components/EmployeeFormModal';
import '../styles/EmployeePage.css';

function EmployeePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  const handleAddClick = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this employee?")) {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  }
};

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

const handleFormSubmit = (employeeData) => {
  if (selectedEmployee) {
    // Update existing
    setEmployees(prev =>
      prev.map(emp =>
        emp.email === selectedEmployee.email ? employeeData : emp
      )
    );
  } else {
    // Add new
    setEmployees(prev => [...prev, employeeData]);
  }

  setShowModal(false);       // Close modal
  setSelectedEmployee(null); // Reset selection
};

  return (
    <div className="employee-page">
      <div className="employee-header">
        <h2>Employee Management</h2>
        <button className="add-btn" onClick={handleAddClick}>+ Add Employee</button>
      </div>

      <EmployeeList
  employees={employees}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

      <EmployeeFormModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        editableEmployee={selectedEmployee}
      />
    </div>
  );
}

export default EmployeePage;
