import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faFile, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const IconItem = ({ icon, name, isSelected, onClick }) => {
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
    const navigate = useNavigate(); // Hook para navegação
    const location = useLocation(); // Hook para pegar a rota atual
    const [selectedItem, setSelectedItem] = useState('Home'); // Inicialmente "Home"

    // Lista de itens da sidebar com ícones e rotas
    const itemsSearch = [
        { icon: faHome, name: 'Home', route: '/' },
        { icon: faQuestionCircle, name: 'Quiz', route: '/quest' },
        { icon: faFile, name: 'Documents', route: '/documents' },
        { icon: faCog, name: 'Settings', route: '/settings' },
    ];

    // Atualizar o item selecionado com base na URL atual
    useEffect(() => {
        const currentRoute = location.pathname;
        const currentItem = itemsSearch.find(item => item.route === currentRoute);
        
        if (currentItem) {
            setSelectedItem(currentItem.name);
        } else if (currentRoute.startsWith('/quiz')) {
            setSelectedItem('Quiz'); // Destaca "Quiz" se estiver em qualquer rota que começa com "/quiz"
        }
    }, [location]); // Reexecuta quando a localização muda

    return (
        <div className="w-80 bg-[#F8F8F8] text-blue-quest p-5 fixed h-full">
            {/* User Section */}
            <div className="flex items-center space-x-2 p-2 bg-gray-200 rounded-2xl mb-4">
                <div className='flex flex-row items-center space-x-2'>
                    <p className='rounded-full bg-blue-quest text-lg text-white flex items-center justify-center w-10 h-10'>U</p>
                    <div className='flex flex-col items-start'>
                        <p className='text-xl font-semibold'>User</p>
                        <p className='text-sm'>User</p>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className='my-2'>
                <p className='border-t-2 my-2 opacity-50'></p>
                {itemsSearch.map((item, index) => (
                    <IconItem 
                        key={index} 
                        icon={item.icon} 
                        name={item.name} 
                        isSelected={selectedItem === item.name}
                        onClick={() => {
                            navigate(item.route); // Navegar para a rota específica
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default SidebarUser;
