import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faFile, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const IconItem = ({ icon, name, route, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
        isSelected ? 'bg-lightblue-quest text-white' : 'hover:bg-gray-200 text-blue-quest'
      }`}
      role="button"
      aria-label={`Navigate to ${name}`}
    >
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        <FontAwesomeIcon icon={icon} className={isSelected ? 'text-white' : 'text-blue-quest'} />
      </div>
      <p className="text-base font-semibold">{name}</p>
    </div>
  );
};

const SidebarUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const itemsSearch = [
    { icon: faHome, name: 'Home', route: '/' },
    { icon: faQuestionCircle, name: 'Quiz', route: '/quest' },
    { icon: faFile, name: 'Documents', route: '/documents' },
    { icon: faCog, name: 'Settings', route: '/settings' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="w-80 bg-[#F8F8F8] text-blue-quest p-5">
      {/* Seção do Usuário */}
      <div className="flex items-center space-x-2 p-2 bg-gray-200 rounded-2xl mb-4">
        <div className="flex flex-row items-center space-x-2">
          <p className="rounded-full bg-blue-quest text-lg text-white flex items-center justify-center w-10 h-10">
            U
          </p>
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold">User</p>
            <p className="text-sm">User</p>
          </div>
        </div>
      </div>

      {/* Seção do Menu */}
      <div className="my-2">
        <p className="border-t-2 my-2 opacity-50"></p>
        {itemsSearch.map((item, index) => (
          <IconItem
            key={index}
            icon={item.icon}
            name={item.name}
            route={item.route}
            isSelected={currentPath === item.route}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarUser;
