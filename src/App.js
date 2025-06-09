import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeePage from './pages/EmployeePage';
import TimePage from './pages/TimePage';
import Navbar from './components/Navbar';
import PayrollPage from './pages/PayrollPage';
import LeaveManagementPage from './pages/LeaveManagementPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/leave-management/:employeeName" element={<LeaveManagementPage />} />
        <Route path="/time" element={<TimePage />} />
        <Route path="/payroll" element={<PayrollPage />} />
      </Routes>
    </Router>
  );
}

export default App;