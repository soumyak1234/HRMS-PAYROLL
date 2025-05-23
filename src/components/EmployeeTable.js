import React, { useState } from 'react';
import '../styles/Table.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const dummyEmployees = [
  { id: 1, name: 'Amit Shah', department: 'HR', role: 'Manager', joinDate: '2021-04-15', status: 'Active' },
  { id: 2, name: 'Priya Verma', department: 'Finance', role: 'Analyst', joinDate: '2022-01-10', status: 'Active' },
  { id: 3, name: 'Ravi Kumar', department: 'IT', role: 'Developer', joinDate: '2020-08-01', status: 'On Leave' },
  { id: 4, name: 'Sneha Gupta', department: 'Marketing', role: 'Executive', joinDate: '2023-02-21', status: 'Active' },
  { id: 5, name: 'Manish Singh', department: 'Operations', role: 'Supervisor', joinDate: '2019-11-25', status: 'Active' },
  { id: 6, name: 'Neha Patel', department: 'Sales', role: 'Sales Lead', joinDate: '2021-09-30', status: 'On Leave' },
  { id: 7, name: 'Vikram Mehra', department: 'Legal', role: 'Advisor', joinDate: '2022-03-19', status: 'Active' },
  { id: 8, name: 'Divya Rana', department: 'Admin', role: 'Clerk', joinDate: '2020-12-05', status: 'Active' },
  { id: 9, name: 'Karan Joshi', department: 'IT', role: 'Tester', joinDate: '2022-07-14', status: 'Active' },
  { id: 10, name: 'Sana Ali', department: 'HR', role: 'Recruiter', joinDate: '2023-01-18', status: 'Active' }
];

function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredEmployees = dummyEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedData = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(filteredEmployees);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Employees');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(file, 'EmployeeData.xlsx');
};

const exportToPDF = () => {
  const doc = new jsPDF();
  doc.text('Employee Directory', 14, 15);

  autoTable(doc, {
    head: [['Name', 'Department', 'Role', 'Joining Date', 'Status']],
    body: filteredEmployees.map((emp) => [
      emp.name,
      emp.department,
      emp.role,
      emp.joinDate,
      emp.status,
    ]),
    startY: 20,
  });

  doc.save('EmployeeData.pdf');
};

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Employee Directory</h3>
        <input
          type="text"
          placeholder="Search by name, department or role"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="export-buttons">
        <button onClick={exportToExcel}>Export to Excel</button>
        <button onClick={exportToPDF}>Export to PDF</button>
      </div>


      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Joining Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No matching records found.</td>
            </tr>
          ) : (
            paginatedData.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.joinDate}</td>
                <td className={emp.status === 'Active' ? 'active' : 'on-leave'}>
                  {emp.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ⬅ Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default EmployeeTable;
