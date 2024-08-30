import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ areas, onSelectArea }) => {
  const [activeArea, setActiveArea] = useState(null);

  const handleAreaClick = (index) => {
    setActiveArea(index);
    onSelectArea(index);
  };

  return (
    <div className="sidebar">
      <ul className="area-list">
        {areas.map((area, index) => (
          <li
            key={index}
            className={`area-item ${activeArea === index ? 'active' : ''}`}
            onClick={() => handleAreaClick(index)}
          >
            {area.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
