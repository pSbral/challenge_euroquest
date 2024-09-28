// src/pages/Quest.js
import React, { useState } from 'react';
import { FaHeart, FaBackward } from 'react-icons/fa';
import SidebarUser from '../../components/SidebarUser';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const onboardingTopics = [
  {
    id: 1,
    name: "Introdução ao Produto",
    exercises: [
      { id: 1, name: "Exercício 1" },
      { id: 2, name: "Exercício 2" },
    ],
  },
  {
    id: 2,
    name: "Navegação na Plataforma",
    exercises: [
      { id: 3, name: "Exercício 3" },
      { id: 4, name: "Exercício 4" },
    ],
  },
  {
    id: 3,
    name: "Configurações de Conta",
    exercises: [
      { id: 5, name: "Exercício 5" },
      { id: 6, name: "Exercício 6" },
    ],
  },
];

const Quest = () => {
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState(null);

  const handleExerciseSelect = (exerciseId) => {
    navigate(`/quiz/${exerciseId}`); // Navega para o quiz com o ID do exercício
  };

  const handleTopicSelect = (topic) => {
    setCurrentTopic(topic); // Define o tópico atual
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <div className="w-1/5">
        <SidebarUser />
      </div>
      <div className="flex-1 p-6 flex flex-col">
        {!currentTopic ? (
          <>
            <h1 className="text-2xl font-bold mb-8  flex items-center">
              Selecione um Tópico
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onboardingTopics.map(topic => (
                <div 
                  key={topic.id} 
                  className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer" 
                  onClick={() => handleTopicSelect(topic)}
                >
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold text-black">{topic.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 flex-grow flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <FaBackward
                className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700 transition duration-300 mr-4"
                onClick={() => setCurrentTopic(null)} // Volta para a seleção de tópicos
              />
            </div>

            <h2 className="text-3xl font-bold mb-6">Exercícios em {currentTopic.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTopic.exercises.map(exercise => (
                <button
                  key={exercise.id}
                  onClick={() => handleExerciseSelect(exercise.id)}
                  className="bg-blue-500 text-white font-semibold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  {exercise.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quest;
