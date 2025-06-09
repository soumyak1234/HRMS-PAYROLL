// src/components/LeaveList.js
import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "../styles/LeavePage.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function LeaveList({ leaves, onEdit, onDelete, filterEmployeeName }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredData = leaves.filter(
    (leave) =>
      leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? leave.status === statusFilter : true) &&
      (filterEmployeeName ? leave.employeeName === filterEmployeeName : true)
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Leave Records", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Employee",
          "Leave Type",
          "Start Date",
          "End Date",
          "Days",
          "Status",
          "Reason",
        ],
      ],
      body: leaves.map((leave) => [
        leave.employeeName,
        leave.leaveType,
        leave.startDate,
        leave.endDate,
        leave.days,
        leave.status,
        leave.reason,
      ]),
    });
    doc.save("leave_records.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leaves);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leaves");
    XLSX.writeFile(workbook, "leave_records.xlsx");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this leave record?")) {
      onDelete(id);
    }
  };

  return (
    <div className="table-container">
      {filterEmployeeName && (
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Showing leaves for: {filterEmployeeName}
        </div>
      )}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={exportToPDF}>Export PDF</button>
        <button onClick={exportToExcel}>Export Excel</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employeeName}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.days}</td>
              <td>{leave.status}</td>
              <td>{leave.reason}</td>
              <td>
                <FaEdit className="action-icon" onClick={() => onEdit(leave)} />
                <FaTrash
                  className="action-icon"
                  onClick={() => handleDelete(leave.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveList;
