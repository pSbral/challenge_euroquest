import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faFile, faTrophy } from '@fortawesome/free-solid-svg-icons';

const IconItem = ({ icon, name }) => {
  return (
    <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        <FontAwesomeIcon icon={icon} className="text-blue-quest" />
      </div>
      <p className="text-base font-semibold text-blue-quest">{name}</p>
    </div>
  );
};

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

  const itemsSearch = [
    { icon: faHome, name: 'Home' },
    { icon: faCog, name: 'Settings' },
    { icon: faFile, name: 'Documents' },
    { icon: faTrophy, name: 'Achievements' },
  ];

  return (
    <div className="w-80 bg-[#F8F8F8] text-blue-quest p-5 fixed h-full">

      {/* User */}
      <div className="flex items-center space-x-2 p-2 bg-gray-200 rounded-2xl">
        <div className='flex flex-row items-center align-middle space-x-2'>
          <p className='rounded-full bg-blue-quest text-lg text-white flex items-center align-middle justify-center w-10 h-10'>A</p>
          <div className='flex flex-col items-start'>
            <p className='text-xl font-semibold'>ADM</p>
            <p className='text-sm'>Administrador</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className='my-2'>
        <div>
          <p className='border-t-2 my-2 opacity-50'></p>
          <div>
            {itemsSearch.map((item, index) => (
              <IconItem key={index} icon={item.icon} name={item.name} />
            ))}
          </div>
        </div>
      </div>

      {/* Administração */}
      <div className=''>
        <p className="flex flex-row justify-center border-t-2 text-blue-quest opacity-50 pt-2 font-semibold">
          Administração
        </p>
        <ul className="space-y-3">
          {areas.map((area, index) => (
            <li key={index}>
              <div
                className={`p-2 rounded cursor-pointer ${selectedArea === index ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
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

        {/* Add Area Form */}
        {showAreaForm ? (
          <div className="mt-5">
            <input
              type="text"
              value={newAreaName}
              onChange={(e) => setNewAreaName(e.target.value)}
              placeholder="Nome da Nova Área"
              className="w-full p-2 rounded bg-gray-200 text-blue-quest placeholder-blue-quest"
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
            className="w-full mt-3 p-2 bg-lightblue-quest hover:bg-lightblue-quest-hover duration-300 rounded text-white"
            onClick={() => setShowAreaForm(true)}
          >
            Adicionar Área
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
