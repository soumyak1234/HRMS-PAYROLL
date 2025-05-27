// src/pages/PayrollPage.js
import React, { useState } from "react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
import "../styles/PayrollPage.css";

const samplePayroll = [
  {
    id: 1,
    name: "Chinmaya Nayak",
    department: "HR",
    base: 50000,
    bonus: 5000,
    deductions: 2000,
    paid: false,
  },
  {
    id: 2,
    name: "Soumyak Behera",
    department: "Finance",
    base: 60000,
    bonus: 4000,
    deductions: 3000,
    paid: true,
  },
  {
    id: 3,
    name: "Anita Patra",
    department: "Engineering",
    base: 70000,
    bonus: 6000,
    deductions: 4000,
    paid: false,
  },
  {
    id: 4,
    name: "John Doe",
    department: "HR",
    base: 52000,
    bonus: 4500,
    deductions: 2500,
    paid: true,
  },
  {
    id: 5,
    name: "Jane Smith",
    department: "Finance",
    base: 58000,
    bonus: 4200,
    deductions: 2800,
    paid: false,
  },
  {
    id: 6,
    name: "Rajiv Kumar",
    department: "Engineering",
    base: 73000,
    bonus: 6500,
    deductions: 3500,
    paid: true,
  },
  {
    id: 7,
    name: "Rina Sahu",
    department: "HR",
    base: 51000,
    bonus: 4000,
    deductions: 2200,
    paid: false,
  },
  {
    id: 8,
    name: "Ajay Nanda",
    department: "Finance",
    base: 59000,
    bonus: 4100,
    deductions: 2900,
    paid: true,
  },
  {
    id: 9,
    name: "Kavita Das",
    department: "Engineering",
    base: 75000,
    bonus: 6700,
    deductions: 3700,
    paid: false,
  },
  {
    id: 10,
    name: "Sunil Rath",
    department: "HR",
    base: 53000,
    bonus: 4800,
    deductions: 2600,
    paid: true,
  },
];

function PayrollPage() {
  const [payroll, setPayroll] = useState(samplePayroll);
  const [selectedDept, setSelectedDept] = useState("All");
  const [filterPaid, setFilterPaid] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const generatePayslip = (record) => {
    const doc = new jsPDF();
    doc.text("Payslip", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Name", record.name],
        ["Department", record.department],
        ["Base Salary", record.base],
        ["Bonus", record.bonus],
        ["Deductions", record.deductions],
        ["Net Pay", record.base + record.bonus - record.deductions],
      ],
    });
    doc.save(`${record.name}_Payslip.pdf`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredPayroll.map(({ id, ...rest }) => rest)
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll");
    XLSX.writeFile(workbook, "Payroll.xlsx");
  };

  const handlePaidToggle = (id) => {
    setPayroll((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, paid: !emp.paid } : emp))
    );
  };

  const filteredPayroll = payroll.filter((emp) => {
    const deptMatch = selectedDept === "All" || emp.department === selectedDept;
    const paidMatch =
      filterPaid === "All" ||
      (filterPaid === "Paid" && emp.paid) ||
      (filterPaid === "Unpaid" && !emp.paid);
    return deptMatch && paidMatch;
  });

  const totalBase = filteredPayroll.reduce((acc, emp) => acc + emp.base, 0);
  const totalBonus = filteredPayroll.reduce((acc, emp) => acc + emp.bonus, 0);
  const totalDeductions = filteredPayroll.reduce(
    (acc, emp) => acc + emp.deductions,
    0
  );
  const totalNetPay = filteredPayroll.reduce(
    (acc, emp) => acc + emp.base + emp.bonus - emp.deductions,
    0
  );

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    base: "",
    bonus: "",
    deductions: "",
  });

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setEditFormData({
      name: emp.name,
      base: emp.base,
      bonus: emp.bonus,
      deductions: emp.deductions,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (id) => {
    setPayroll((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              name: editFormData.name,
              base: parseInt(editFormData.base),
              bonus: parseInt(editFormData.bonus),
              deductions: parseInt(editFormData.deductions),
            }
          : emp
      )
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayroll.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayroll.length / itemsPerPage);

  return (
    <div className="common-page">
      <div className="common-header">
        <h2>Payroll</h2>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>

      <div className="filters">
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Engineering">Engineering</option>
        </select>
        <select
          value={filterPaid}
          onChange={(e) => setFilterPaid(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {/* Filter Badges */}
      <div className="filter-badges">
        <span className="badge">Department: {selectedDept}</span>
        <span className="badge">Status: {filterPaid}</span>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Base</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((emp) => (
              <tr key={emp.id} className={emp.paid ? "paid-row" : "unpaid-row"}>
                {editingId === emp.id ? (
                  <>
                    <td>
                      <input
                        name="name"
                        value={editFormData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>{emp.department}</td>
                    <td>
                      <input
                        name="base"
                        value={editFormData.base}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="bonus"
                        value={editFormData.bonus}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="deductions"
                        value={editFormData.deductions}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      {editFormData.base &&
                      editFormData.bonus &&
                      editFormData.deductions
                        ? parseInt(editFormData.base) +
                          parseInt(editFormData.bonus) -
                          parseInt(editFormData.deductions)
                        : "-"}
                    </td>
                    <td>{emp.paid ? "Paid" : "Unpaid"}</td>
                    <td>
                      <button onClick={() => handleSave(emp.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{emp.name}</td>
                    <td>{emp.department}</td>
                    <td>{emp.base}</td>
                    <td>{emp.bonus}</td>
                    <td>{emp.deductions}</td>
                    <td>{emp.base + emp.bonus - emp.deductions}</td>
                    <td>{emp.paid ? "Paid" : "Unpaid"}</td>
                    <td>
                      <button onClick={() => generatePayslip(emp)}>
                        Payslip
                      </button>
                      <button onClick={() => handlePaidToggle(emp.id)}>
                        {emp.paid ? "Mark Unpaid" : "Mark Paid"}
                      </button>
                      <button onClick={() => handleEdit(emp)}>Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td></td>
              <td>
                <strong>{totalBase}</strong>
              </td>
              <td>
                <strong>{totalBonus}</strong>
              </td>
              <td>
                <strong>{totalDeductions}</strong>
              </td>
              <td>
                <strong>{totalNetPay}</strong>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayrollPage;
