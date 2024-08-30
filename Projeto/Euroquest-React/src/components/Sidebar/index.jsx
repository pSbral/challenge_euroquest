import React, { useState } from 'react';

const Sidebar = ({ areas, onSelectArea, onAddArea, selectedArea }) => {
  const [showAreaForm, setShowAreaForm] = useState(false);
  const [newAreaName, setNewAreaName] = useState('');

  const handleAddArea = () => {
    if (newAreaName.trim() !== '') {
      onAddArea(newAreaName);
      setNewAreaName('');
      setShowAreaForm(false);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-5 fixed h-full">
      <p className='flex flex-row justify-center border-t-2 mb-5 pt-1'>Administração</p>
      <ul className="space-y-3">
        {areas.map((area, index) => (
          <li key={index}>
            <div
              className={`p-2 rounded cursor-pointer ${
                selectedArea === index ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => onSelectArea(index)}
            >
              {area.name}
            </div>
            {selectedArea === index && (
              <ul className="pl-4 space-y-2 mt-2">
                {area.trails.map((trilha, trilhaIndex) => (
                  <li key={trilhaIndex} className="text-sm bg-gray-700 hover:bg-gray-600 p-2 rounded">
                    {trilha.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {showAreaForm ? (
        <div className="mt-5">
          <input
            type="text"
            value={newAreaName}
            onChange={(e) => setNewAreaName(e.target.value)}
            placeholder="Nome da Nova Área"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleAddArea}
              className="flex-1 p-2 bg-green-600 hover:bg-green-700 rounded text-white"
            >
              Adicionar Área
            </button>
            <button
              onClick={() => setShowAreaForm(false)}
              className="flex-1 p-2 bg-red-600 hover:bg-red-700 rounded text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          className="w-full mt-5 p-2 bg-green-600 hover:bg-green-700 rounded text-white"
          onClick={() => setShowAreaForm(true)}
        >
          Adicionar Área
        </button>
      )}
    </div>
  );
};

export default Sidebar;
