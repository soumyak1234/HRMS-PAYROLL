import React from 'react';
import '../styles/Widgets.css';

function StatWidget({ title, value, icon, color }) {
  return (
    <div className="stat-widget" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="widget-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="widget-info">
        <p className="widget-title">{title}</p>
        <h2 className="widget-value">{value}</h2>
      </div>
    </div>
  );
}

export default StatWidget;