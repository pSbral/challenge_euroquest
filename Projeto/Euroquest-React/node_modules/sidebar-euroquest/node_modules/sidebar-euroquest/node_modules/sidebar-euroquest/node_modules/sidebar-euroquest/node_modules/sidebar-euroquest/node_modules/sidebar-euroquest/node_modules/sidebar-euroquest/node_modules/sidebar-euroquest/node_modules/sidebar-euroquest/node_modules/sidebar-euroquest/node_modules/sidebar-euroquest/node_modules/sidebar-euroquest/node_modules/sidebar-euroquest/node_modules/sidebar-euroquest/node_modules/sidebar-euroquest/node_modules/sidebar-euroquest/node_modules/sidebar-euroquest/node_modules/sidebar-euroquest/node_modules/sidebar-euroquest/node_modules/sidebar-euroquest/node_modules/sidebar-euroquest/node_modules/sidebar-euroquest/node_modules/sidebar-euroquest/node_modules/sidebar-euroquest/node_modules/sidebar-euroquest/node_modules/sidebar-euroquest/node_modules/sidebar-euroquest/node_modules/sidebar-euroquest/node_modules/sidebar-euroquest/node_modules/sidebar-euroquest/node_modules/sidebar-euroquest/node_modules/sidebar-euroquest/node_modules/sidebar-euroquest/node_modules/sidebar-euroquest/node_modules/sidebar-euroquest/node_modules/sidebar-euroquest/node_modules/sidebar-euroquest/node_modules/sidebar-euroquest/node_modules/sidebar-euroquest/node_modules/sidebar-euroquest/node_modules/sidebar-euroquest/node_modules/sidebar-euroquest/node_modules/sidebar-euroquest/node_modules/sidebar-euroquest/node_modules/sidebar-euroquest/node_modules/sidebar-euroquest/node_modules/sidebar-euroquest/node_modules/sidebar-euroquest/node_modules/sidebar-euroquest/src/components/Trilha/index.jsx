import React from 'react';

const Trilha = ({
  name,
  lastModified,
  exercises,
  trilhaIndex,
  onDeleteExercicio,
  onEditExercicio,
  setEditExercicioIndex,
  editExercicioIndex,
}) => {
  const handleEdit = (index) => {
    setEditExercicioIndex({ trilhaIndex, index });
  };

  const handleSaveEdit = (index, event) => {
    if (event.key === 'Enter') {
      onEditExercicio(trilhaIndex, index, event.target.value);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-500 mb-3">Última modificação: {lastModified}</p>
      <ul className="space-y-2">
        {exercises.map((exercise, index) => (
          <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow">
            {editExercicioIndex && editExercicioIndex.trilhaIndex === trilhaIndex && editExercicioIndex.index === index ? (
              <input
                type="text"
                defaultValue={exercise}
                onKeyDown={(event) => handleSaveEdit(index, event)}
                onBlur={() => setEditExercicioIndex(null)}
                className="flex-1 p-2 border rounded"
                autoFocus
              />
            ) : (
              <>
                <span className="flex-1">{exercise}</span>
                <button
                  className="ml-2 p-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                  onClick={() => handleEdit(index)}
                >
                  Editar
                </button>
              </>
            )}
            <button
              className="ml-2 p-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
              onClick={() => onDeleteExercicio(trilhaIndex, index)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trilha;
