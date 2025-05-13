import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import '../styles/Charts.css';

const data = [
  { month: 'Jan', employees: 120 },
  { month: 'Feb', employees: 135 },
  { month: 'Mar', employees: 150 },
  { month: 'Apr', employees: 160 },
  { month: 'May', employees: 175 },
  { month: 'Jun', employees: 190 },
];

const EmployeeLineChart = () => {
  return (
    <div className="chart-container">
      <h3>Employee Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="employees" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EmployeeLineChart;