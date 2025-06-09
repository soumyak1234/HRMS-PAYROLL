// src/components/EmployeeList.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "../styles/EmployeeTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function EmployeeList({ employees, onDelete, onEdit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();

  const handleNameClick = (employeeName) => {
    const encodedName = encodeURIComponent(employeeName);
    navigate(`/leave-management/${encodedName}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter ? emp.department === departmentFilter : true) &&
      (statusFilter ? emp.status === statusFilter : true)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee List", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Department", "Role", "Phone", "DOJ", "Status"]],
      body: employees.map((emp) => [
        emp.name,
        emp.email,
        emp.department,
        emp.role,
        emp.phone,
        emp.doj,
        emp.status,
      ]),
    });
    doc.save("employee_list.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "employee_list.xlsx");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      onDelete(id);
    }
  };

  return (
    <div className="table-container">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={exportToPDF}>Export PDF</button>
        <button onClick={exportToExcel}>Export Excel</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Phone</th>
            <th>DOJ</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((emp) => (
            <tr key={emp.id}>
              <td>
                <span
                  className="clickable-name"
                  onClick={() => handleNameClick(emp.name)}
                >
                  {emp.name}
                </span>
              </td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>{emp.phone}</td>
              <td>{emp.doj}</td>
              <td>{emp.status}</td>
              <td>
                <FaEdit className="action-icon" onClick={() => onEdit(emp)} />
                <FaTrash
                  className="action-icon"
                  onClick={() => handleDelete(emp.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default EmployeeList;
