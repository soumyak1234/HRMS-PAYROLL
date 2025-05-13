import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import '../styles/Charts.css';

const data = [
  { subject: 'Attendance', A: 120 },
  { subject: 'Productivity', A: 98 },
  { subject: 'Communication', A: 86 },
  { subject: 'Teamwork', A: 99 },
  { subject: 'Punctuality', A: 85 },
  { subject: 'Leadership', A: 65 },
];

const EmployeeRadarChart = () => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Employee Performance Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeRadarChart;