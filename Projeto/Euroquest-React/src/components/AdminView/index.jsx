import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Trilha from '../Trilha';
import './AdminView.css';

const AdminView = () => {
  const areas = [
    {
      name: 'Área 1',
      trails: [
        {
          name: 'Trilha 1.1',
          lastModified: '10/08/2024',
          exercises: ['Exercício 1.1.1', 'Exercício 1.1.2', 'Exercício 1.1.3'],
        },
        {
          name: 'Trilha 1.2',
          lastModified: '15/08/2024',
          exercises: ['Exercício 1.2.1', 'Exercício 1.2.2'],
        },
      ],
    },
    {
      name: 'Área 2',
      trails: [
        {
          name: 'Trilha 2.1',
          lastModified: '12/08/2024',
          exercises: ['Exercício 2.1.1', 'Exercício 2.1.2'],
        },
      ],
    },
  ];

  const [selectedArea, setSelectedArea] = useState(null);

  const handleAreaSelection = (index) => {
    setSelectedArea(areas[index]);
  };

  return (
    <div className="admin-view-container">
      <Sidebar areas={areas} onSelectArea={handleAreaSelection} />
      <div className="trilhas-view">
        {selectedArea ? (
          selectedArea.trails.map((trilha, index) => (
            <Trilha
              key={index}
              name={trilha.name}
              lastModified={trilha.lastModified}
              exercises={trilha.exercises}
            />
          ))
        ) : (
          <div className="no-area-selected">
            <h2>Selecione uma área para visualizar as trilhas.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;
