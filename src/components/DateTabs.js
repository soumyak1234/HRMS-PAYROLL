import React, { useState } from 'react';

function DateTabs({ onChange }) {
  const [active, setActive] = useState('Monthly');

  const tabs = ['Weekly', 'Monthly', 'Yearly'];

  const handleTabClick = (tab) => {
    setActive(tab);
    onChange(tab); // Notify parent
  };

  return (
    <div className="date-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-button ${active === tab ? 'active' : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default DateTabs;