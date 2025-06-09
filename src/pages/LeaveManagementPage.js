// src/pages/LeaveManagementPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LeaveList from "../components/LeaveList";
import LeaveFormModal from "../components/LeaveFormModal";
import "../styles/LeavePage.css";

function LeaveManagementPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const { employeeName } = useParams();
  const decodedEmployeeName = decodeURIComponent(employeeName);

  const defaultLeaves = [
    {
      id: 1,
      employeeName: "Soumyak Ranjan Behera",
      leaveType: "Casual Leave",
      startDate: "2025-06-05",
      endDate: "2025-06-07",
      days: 3,
      status: "Approved",
      reason: "Family function",
    },
    {
      id: 2,
      employeeName: "Anita Patra",
      leaveType: "Sick Leave",
      startDate: "2025-06-02",
      endDate: "2025-06-03",
      days: 2,
      status: "Pending",
      reason: "Fever",
    },
  ];

  const [leaves, setLeaves] = useState(defaultLeaves);

  const handleAddClick = () => {
    setSelectedLeave(null);
    setShowModal(true);
  };

  const handleEdit = (leave) => {
    setSelectedLeave(leave);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setLeaves((prev) => prev.filter((leave) => leave.id !== id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLeave(null);
  };

  const handleSave = (leave) => {
    if (selectedLeave) {
      // Update existing
      setLeaves((prev) =>
        prev.map((l) =>
          l.id === selectedLeave.id ? { ...leave, id: selectedLeave.id } : l
        )
      );
    } else {
      // Add new
      const newLeave = {
        ...leave,
        id: leaves.length ? Math.max(...leaves.map((l) => l.id)) + 1 : 1,
      };
      setLeaves((prev) => [...prev, newLeave]);
    }

    setShowModal(false);
    setSelectedLeave(null);
  };

  return (
    <div className="common-page">
      <div className="common-header">
        <h2>Leave Management</h2>
        <button className="add-btn" onClick={handleAddClick}>
          + Add Leave
        </button>
      </div>

      <LeaveList
        leaves={leaves}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterEmployeeName={decodedEmployeeName}
      />
      <LeaveFormModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        editableLeave={selectedLeave}
      />
    </div>
  );
}

export default LeaveManagementPage;
