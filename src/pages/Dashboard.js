import React, { useState } from "react";
import StatWidget from "../components/StatWidget";
import DateTabs from "../components/DateTabs";
import EmployeeLineChart from "../components/EmployeeLineChart.js";
import DepartmentBarChart from "../components/DepartmentBarChart.js";
import EmployeePieChart from "../components/EmployeePieChart.js";
import EmployeeRadarChart from "../components/EmployeeRadarChart.js";
import EmployeeTable from "../components/EmployeeTable";
import "../styles/Table.css";
import "../styles/Dashboard.css";
import "../styles/Widgets.css";
import "../styles/Charts.css";
import {
  FaUsers,
  FaVenusMars,
  FaUserTie,
  FaChartLine,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaThumbtack,
} from "react-icons/fa";

function Dashboard() {
  const [timeRange, setTimeRange] = useState("Monthly");

  return (
    <>
      <div className="dashboard-container">
        <h2>Welcome to HR & Payroll Dashboard</h2>
        <div className="stat-widgets-row">
          <StatWidget
            title="Total Employees"
            value="248"
            icon={<FaUsers />}
            color="#2563eb"
          />
          <StatWidget
            title="Gender Diversity"
            value="52% Female"
            icon={<FaVenusMars />}
            color="#ec4899"
          />
          <StatWidget
            title="HR to Employee Ratio"
            value="1:62"
            icon={<FaUserTie />}
            color="#10b981"
          />
          <StatWidget
            title="Avg. Tenure"
            value="3.7 Years"
            icon={<FaChartLine />}
            color="#f59e0b"
          />
          {/* <StatWidget title="Employees" value="120" icon={<FaUserTie />} color="#2563eb" /> */}
          <StatWidget
            title="Monthly Payroll"
            value="₹5,20,000"
            icon={<FaMoneyBillWave />}
            color="#10b981"
          />
          <StatWidget
            title="Leaves Today"
            value="8"
            icon={<FaCalendarAlt />}
            color="#f59e0b"
          />
          <StatWidget
            title="Open Positions"
            value="3"
            icon={<FaThumbtack />}
            color="#ec4899"
          />
        </div>

        <DateTabs onChange={(val) => setTimeRange(val)} />

        <div className="charts-row">
          <EmployeeLineChart />
          <DepartmentBarChart />
        </div>

        <div className="charts-row">
          <EmployeePieChart />
          <EmployeeRadarChart />
        </div>
        <div className="dashboard-table">
          <EmployeeTable />
        </div>
        
      </div>
    </>
  );
}

export default Dashboard;
