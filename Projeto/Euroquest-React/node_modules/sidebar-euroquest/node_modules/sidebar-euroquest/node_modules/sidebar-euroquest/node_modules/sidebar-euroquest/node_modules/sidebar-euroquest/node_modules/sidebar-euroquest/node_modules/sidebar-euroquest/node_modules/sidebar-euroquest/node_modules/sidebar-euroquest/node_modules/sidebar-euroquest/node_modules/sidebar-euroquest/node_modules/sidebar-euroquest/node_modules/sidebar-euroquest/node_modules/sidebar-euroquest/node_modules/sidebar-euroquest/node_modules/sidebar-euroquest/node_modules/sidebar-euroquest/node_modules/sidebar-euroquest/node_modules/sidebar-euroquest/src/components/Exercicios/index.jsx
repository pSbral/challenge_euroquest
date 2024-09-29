// src/pages/ExerciseSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarUser from '../../components/SidebarUser'; // Importando a SidebarUser
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'; // Ícone de lista de tarefas

const ExerciseSelection = ({ exercises }) => {
  const navigate = useNavigate();

  const handleExerciseSelect = (exerciseId) => {
    navigate(`/quiz/${exerciseId}`); // Navega para o quiz com o ID do exercício
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <div className="w-1/5">
        <SidebarUser /> {/* Sidebar à esquerda */}
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 flex items-center">
          <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
          Selecione um Exercício
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(exercise => (
            <button
              key={exercise.id}
              onClick={() => handleExerciseSelect(exercise.id)}
              className="bg-blue-500 text-white font-semibold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              {exercise.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseSelection;
