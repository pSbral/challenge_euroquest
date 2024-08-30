import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Trilha from '../Trilha';

const AdminView = () => {
  const [areas, setAreas] = useState([
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
  ]);

  const [selectedArea, setSelectedArea] = useState(null);
  const [showTrilhaForm, setShowTrilhaForm] = useState(false);
  const [showExercicioForm, setShowExercicioForm] = useState(null);
  const [editExercicioIndex, setEditExercicioIndex] = useState(null);

  const handleAreaSelection = (index) => {
    setSelectedArea(index);
  };

  const handleAddArea = (newAreaName) => {
    const newArea = {
      name: newAreaName,
      trails: [],
    };
    setAreas([...areas, newArea]);
    setSelectedArea(areas.length); // Seleciona a nova área automaticamente
  };

  const handleAddTrilha = (newTrilha) => {
    const updatedAreas = [...areas];
    updatedAreas[selectedArea].trails.push(newTrilha);
    setAreas(updatedAreas);
    setShowTrilhaForm(false);
  };

  const handleAddExercicio = (trilhaIndex, newExercicio) => {
    const updatedAreas = [...areas];
    updatedAreas[selectedArea].trails[trilhaIndex].exercises.push(newExercicio);
    setAreas(updatedAreas);
    setShowExercicioForm(null);
  };

  const handleDeleteExercicio = (trilhaIndex, exerciseIndex) => {
    const updatedAreas = [...areas];
    updatedAreas[selectedArea].trails[trilhaIndex].exercises.splice(exerciseIndex, 1);
    setAreas(updatedAreas);
  };

  const handleEditExercicio = (trilhaIndex, exerciseIndex, newExercicioName) => {
    const updatedAreas = [...areas];
    updatedAreas[selectedArea].trails[trilhaIndex].exercises[exerciseIndex] = newExercicioName;
    setAreas(updatedAreas);
    setEditExercicioIndex(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        areas={areas}
        onSelectArea={handleAreaSelection}
        onAddArea={handleAddArea}
        selectedArea={selectedArea}
      />

      <div className="flex-1 p-6 ml-64 bg-gray-100 overflow-y-auto">
        {selectedArea !== null ? (
          <>
            {areas[selectedArea].trails.map((trilha, trilhaIndex) => (
              <div key={trilhaIndex} className="bg-white p-5 rounded-lg shadow mb-6">
                <Trilha
                  name={trilha.name}
                  lastModified={trilha.lastModified}
                  exercises={trilha.exercises}
                  trilhaIndex={trilhaIndex}
                  onDeleteExercicio={handleDeleteExercicio}
                  onEditExercicio={handleEditExercicio}
                  setEditExercicioIndex={setEditExercicioIndex}
                  editExercicioIndex={editExercicioIndex}
                />
                <button
                  className="mt-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  onClick={() => setShowExercicioForm(trilhaIndex)}
                >
                  Adicionar Exercício
                </button>
                {showExercicioForm === trilhaIndex && (
                  <ExercicioForm
                    onSubmit={(newExercicio) => handleAddExercicio(trilhaIndex, newExercicio)}
                  />
                )}
              </div>
            ))}
            <button
              className="fixed bottom-5 left-72 p-3 bg-green-600 hover:bg-green-700 text-white rounded"
              onClick={() => setShowTrilhaForm(true)}
            >
              Adicionar Trilha
            </button>
            {showTrilhaForm && (
              <TrilhaForm onSubmit={handleAddTrilha} />
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-lg text-gray-600">Selecione uma área para visualizar as trilhas.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

const TrilhaForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [lastModified] = useState(new Date().toLocaleDateString());
  const [exercises] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, lastModified, exercises });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white shadow rounded-lg">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da Trilha"
        className="p-2 border rounded w-full mb-3"
        required
      />
      <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">
        Adicionar Trilha
      </button>
    </form>
  );
};

const ExercicioForm = ({ onSubmit }) => {
  const [exercise, setExercise] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(exercise);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 p-3 bg-gray-100 rounded-lg shadow">
      <input
        type="text"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        placeholder="Nome do Exercício"
        className="p-2 border rounded w-full mb-2"
        required
      />
      <button type="submit" className="p-2 bg-blue-600 text-white rounded w-full">
        Adicionar Exercício
      </button>
    </form>
  );
};

export default AdminView;
