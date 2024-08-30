import React from 'react';
import './Trilha.css'; // Arquivo CSS para estilizar o componente

const Trilha = ({ name, lastModified, exercises }) => {
  return (
    <div className="trilha-container">
      <h2>{name}</h2>
      <p>Última modificação: {lastModified}</p>
      <ul className="exercise-list">
        {exercises.map((exercise, index) => (
          <li key={index} className="exercise-item">
            {exercise}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trilha;