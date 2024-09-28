import React from 'react';
import SidebarUser from '../../components/SidebarUser';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const options = [
        { name: 'Iniciar Quiz', route: '/quiz', description: 'Teste seus conhecimentos com nosso quiz interativo!' },
        { name: 'Ver Documentos', route: '/documents', description: 'Acesse seus documentos e relatórios importantes.' },
        { name: 'Configurações', route: '/settings', description: 'Personalize suas preferências e ajustes.' },
    ];

    return (
        <div className="flex flex-row min-h-screen bg-gray-100">
            <div className='w-1/5'>
                <SidebarUser />
            </div>
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Bem-vindo de volta!</h1>
                <p className="text-lg mb-6 text-gray-600">
                    Explore suas opções e maximize sua experiência:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {options.map((option, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105">
                            <h2 className="text-xl font-semibold text-gray-800">{option.name}</h2>
                            <p className="text-gray-500 mb-4">{option.description}</p>
                            <button
                                onClick={() => navigate(option.route)}
                                className="mt-2 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
                            >
                                Acessar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
