import React, { useState } from 'react';
import './Sidebar.css'; // Você pode criar este arquivo para estilizar o componente

const Sidebar = ({ areas }) => {
  const [activeArea, setActiveArea] = useState(null);

  const handleAreaClick = (index) => {
    setActiveArea(index);
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
            <ul className="trail-list">
              {area.trails.map((trail, trailIndex) => (
                <li key={trailIndex} className="trail-item">
                  {trail}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
