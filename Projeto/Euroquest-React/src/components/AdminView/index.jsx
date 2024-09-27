import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Trilha from '../Trilha';
import {
  getAreas,
  getTrilhaCount,
  getExercicioCount,
  addArea,
  updateArea,
  deleteArea,
  addTrilha,
  updateTrilha,
  deleteTrilha,
  addExercicio,
  updateExercicio,
  deleteExercicio,
} from '../../apiService'; // Import the service
import AddExercise from '../AdminAddExercise';

const AdminView = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showTrilhaForm, setShowTrilhaForm] = useState(false);
  const [showExercicioForm, setShowExercicioForm] = useState(null);
  const [editExercicioIndex, setEditExercicioIndex] = useState(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await getAreas();
        const areasWithCounts = await Promise.all(
          data.map(async (area) => {
            const trilhaCount = await getTrilhaCount(area.id);
            return { ...area, trilhaCount };
          })
        );
        setAreas(areasWithCounts);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  const handleAreaSelection = async (index) => {
    setSelectedArea(index);

    // Fetch the number of exercicios for each trilha in the selected area
    const area = areas[index];
    const trilhasWithExercicioCount = await Promise.all(
      area.trails.map(async (trilha) => {
        const exercicioCount = await getExercicioCount(trilha.id);
        return { ...trilha, exercicioCount };
      })
    );
    const updatedAreas = [...areas];
    updatedAreas[index] = { ...area, trails: trilhasWithExercicioCount };
    setAreas(updatedAreas);
  };

  const handleAddArea = async (newAreaName) => {
    const newArea = { name: newAreaName, trails: [] };
    try {
      const savedArea = await addArea(newArea);
      setAreas([...areas, savedArea]);
      setSelectedArea(areas.length); // Select the newly added area
    } catch (error) {
      console.error('Error adding area:', error);
    }
  };

  const handleUpdateArea = async (areaId, updatedArea) => {
    try {
      const savedArea = await updateArea(areaId, updatedArea);
      const updatedAreas = areas.map((area) => (area.id === areaId ? savedArea : area));
      setAreas(updatedAreas);
    } catch (error) {
      console.error('Error updating area:', error);
    }
  };

  const handleDeleteArea = async (areaId) => {
    try {
      await deleteArea(areaId);
      setAreas(areas.filter((area) => area.id !== areaId));
      setSelectedArea(null);
    } catch (error) {
      console.error('Error deleting area:', error);
    }
  };

  const handleAddTrilha = async (newTrilha) => {
    const areaId = areas[selectedArea].id;
    try {
      const savedTrilha = await addTrilha(areaId, newTrilha);
      const updatedAreas = [...areas];
      updatedAreas[selectedArea].trails.push(savedTrilha);
      setAreas(updatedAreas);
      setShowTrilhaForm(false);
    } catch (error) {
      console.error('Error adding trilha:', error);
    }
  };

  const handleUpdateTrilha = async (trilhaId, updatedTrilha) => {
    try {
      const savedTrilha = await updateTrilha(trilhaId, updatedTrilha);
      const updatedAreas = [...areas];
      const selectedTrilhas = updatedAreas[selectedArea].trails;
      const trilhaIndex = selectedTrilhas.findIndex((trilha) => trilha.id === trilhaId);
      selectedTrilhas[trilhaIndex] = savedTrilha;
      setAreas(updatedAreas);
    } catch (error) {
      console.error('Error updating trilha:', error);
    }
  };

  const handleDeleteTrilha = async (trilhaId) => {
    try {
      await deleteTrilha(trilhaId);
      const updatedAreas = [...areas];
      updatedAreas[selectedArea].trails = updatedAreas[selectedArea].trails.filter(
        (trilha) => trilha.id !== trilhaId
      );
      setAreas(updatedAreas);
    } catch (error) {
      console.error('Error deleting trilha:', error);
    }
  };

  const handleAddExercicio = async (trilhaIndex, newExercicio) => {
    const trilhaId = areas[selectedArea].trails[trilhaIndex].id;
    try {
      const savedExercicio = await addExercicio(trilhaId, newExercicio);
      const updatedAreas = [...areas];
      updatedAreas[selectedArea].trails[trilhaIndex].exercises.push(savedExercicio);
      setAreas(updatedAreas);
      setShowExercicioForm(null);
    } catch (error) {
      console.error('Error adding exercicio:', error);
    }
  };

  const handleUpdateExercicio = async (trilhaIndex, exerciseIndex, newExercicioName) => {
    const trilhaId = areas[selectedArea].trails[trilhaIndex].id;
    const exercicioId = areas[selectedArea].trails[trilhaIndex].exercises[exerciseIndex].id;
    const updatedExercicio = { name: newExercicioName };

    try {
      const updatedExercise = await updateExercicio(trilhaId, exercicioId, updatedExercicio);
      const updatedAreas = [...areas];
      updatedAreas[selectedArea].trails[trilhaIndex].exercises[exerciseIndex] = updatedExercise;
      setAreas(updatedAreas);
      setEditExercicioIndex(null);
    } catch (error) {
      console.error('Error editing exercise:', error);
    }
  };

  const handleDeleteExercicio = async (trilhaIndex, exerciseIndex) => {
    const trilhaId = areas[selectedArea].trails[trilhaIndex].id;
    const exercicioId = areas[selectedArea].trails[trilhaIndex].exercises[exerciseIndex].id;
    try {
      await deleteExercicio(trilhaId, exercicioId);
      const updatedAreas = [...areas];
      updatedAreas[selectedArea].trails[trilhaIndex].exercises.splice(exerciseIndex, 1);
      setAreas(updatedAreas);
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
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
                  onUpdateTrilha={handleUpdateTrilha}
                  onDeleteTrilha={handleDeleteTrilha}
                  onDeleteExercicio={handleDeleteExercicio}
                  onEditExercicio={handleUpdateExercicio}
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
            <AddExercise />
          </div>
        )}
      </div>
    </div>
  );
};


export default AdminView;
