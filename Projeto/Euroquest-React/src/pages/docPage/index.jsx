import React from 'react';
import SidebarUser from '../../components/SidebarUser';

const documentsData = [
    {
        title: 'Documento 1',
        description: 'Descrição breve do Documento 1. Clique para ler mais.',
    },
    {
        title: 'Documento 2',
        description: 'Descrição breve do Documento 2. Clique para ler mais.',
    },
    {
        title: 'Documento 3',
        description: 'Descrição breve do Documento 3. Clique para ler mais.',
    },
    {
        title: 'Documento 4',
        description: 'Descrição breve do Documento 4. Clique para ler mais.',
    },
];

const Documents = () => {
    return (
        <div className="flex flex-row min-h-screen bg-gray-100">
            <div className='w-1/5'>
                <SidebarUser />
            </div>
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Documentos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documentsData.map((doc, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                            <h2 className="text-xl font-semibold">{doc.title}</h2>
                            <p className="text-gray-700">{doc.description}</p>
                            <button className="mt-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-300">
                                Ler Mais
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Documents;
