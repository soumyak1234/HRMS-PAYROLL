import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeFormModal from '../components/EmployeeFormModal';
import '../styles/EmployeePage.css';

function EmployeePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const defaultEmployees = [
  { id: 1, name: 'Chinmaya Kumar Nayak', email: 'chinmaya@example.com', department: 'HR', role: 'Manager' },
  { id: 2, name: 'Soumyak ranjan Behera', email: 'jane@example.com', department: 'Finance', role: 'Analyst' },
  { id: 3, name: 'Anita Patra', email: 'sam@example.com', department: 'Engineering', role: 'Developer' },
  { id: 4, name: 'Biswajit Bhadra', email: 'lisa@example.com', department: 'Marketing', role: 'Lead' },
];
  const [employees, setEmployees] = useState(defaultEmployees);

  const handleAddClick = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

const handleSave = (employee) => {
  if (selectedEmployee) {
    // Update existing
    setEmployees(prev =>
      prev.map(emp => emp.id === selectedEmployee.id ? { ...employee, id: selectedEmployee.id } : emp)
    );
  } else {
    // Add new
    const newEmployee = {
      ...employee,
      id: employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1,
    };
    setEmployees(prev => [...prev, newEmployee]);
  }

  setShowModal(false);
  setSelectedEmployee(null);
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
        onSave={handleSave}
        editableEmployee={selectedEmployee}
      />
    </div>
  );
}

export default EmployeePage;
