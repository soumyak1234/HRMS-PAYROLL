// TimeTab.js
import React, { useState, useEffect } from "react";
import "../styles/TimePage.css";

const defaultAttendance = [
  {
    id: 1,
    name: "Chinmaya Kumar Nayak",
    department: "HR",
    clockIn: "09:00",
    clockOut: "18:00",
    status: "Present",
  },
  {
    id: 2,
    name: "Soumyak Ranjan Behera",
    department: "Finance",
    clockIn: "",
    clockOut: "",
    status: "Absent",
  },
  {
    id: 3,
    name: "Anita Patra",
    department: "Engineering",
    clockIn: "09:15",
    clockOut: "17:50",
    status: "Present",
  },
  {
    id: 4,
    name: "Biswajit Bhadra",
    department: "Marketing",
    clockIn: "",
    clockOut: "",
    status: "Leave",
  },
  {
    id: 5,
    name: "Suman Sahoo",
    department: "Engineering",
    clockIn: "09:10",
    clockOut: "18:00",
    status: "Present",
  },
  {
    id: 6,
    name: "Priti Swain",
    department: "HR",
    clockIn: "",
    clockOut: "",
    status: "Leave",
  },
  {
    id: 7,
    name: "Bikash Panda",
    department: "Marketing",
    clockIn: "08:50",
    clockOut: "17:45",
    status: "Present",
  },
  {
    id: 8,
    name: "Ramesh Das",
    department: "Finance",
    clockIn: "",
    clockOut: "",
    status: "Absent",
  },
];

function TimePage() {
  const [attendance, setAttendance] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    clockIn: "",
    clockOut: "",
    status: "Present",
  });
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setAttendance(defaultAttendance);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddAttendance = () => {
    const newRecord = {
      ...formData,
      id: attendance.length ? Math.max(...attendance.map((a) => a.id)) + 1 : 1,
    };
    const updatedList = [...attendance, newRecord];
    setAttendance(updatedList);
    setFormData({
      name: "",
      department: "",
      clockIn: "",
      clockOut: "",
      status: "Present",
    });
    setShowModal(false);
  };

  const totalPages = Math.ceil(attendance.length / itemsPerPage);
  const paginatedData = attendance.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatTime = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":");
    const h = +hour % 12 || 12;
    const ampm = +hour >= 12 ? "PM" : "AM";
    return `${h}:${minute} ${ampm}`;
  };

  return (
    <div className="common-page">
      <div className="common-header">
        <h2>Time Tracking</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Attendance
        </button>
      </div>

      <div className="table-container">
        <table className="table">
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
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="5">No attendance records available.</td>
              </tr>
            ) : (
              paginatedData.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{formatTime(emp.clockIn) || "-"}</td>
                  <td>{formatTime(emp.clockOut) || "-"}</td>
                  <td>{emp.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Attendance</h3>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
            </select>

            <input
              type="time"
              name="clockIn"
              value={formData.clockIn}
              onChange={handleChange}
              placeholder="Clock In"
            />

            <input
              type="time"
              name="clockOut"
              value={formData.clockOut}
              onChange={handleChange}
              placeholder="Clock Out"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
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
