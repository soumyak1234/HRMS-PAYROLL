import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeePage from './pages/EmployeePage';
import TimePage from './pages/TimePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/time" element={<TimePage />} />
      </Routes>
    </Router>
  );
}

export default App;