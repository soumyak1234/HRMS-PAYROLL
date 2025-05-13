import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import '../styles/Charts.css';

const data = [
  { dept: 'HR', count: 12 },
  { dept: 'Finance', count: 18 },
  { dept: 'IT', count: 30 },
  { dept: 'Sales', count: 24 },
];

function DepartmentBarChart() {
  return (
    <div className="chart-container">
      <h3>Employees by Department</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="dept" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Bar dataKey="count" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DepartmentBarChart;