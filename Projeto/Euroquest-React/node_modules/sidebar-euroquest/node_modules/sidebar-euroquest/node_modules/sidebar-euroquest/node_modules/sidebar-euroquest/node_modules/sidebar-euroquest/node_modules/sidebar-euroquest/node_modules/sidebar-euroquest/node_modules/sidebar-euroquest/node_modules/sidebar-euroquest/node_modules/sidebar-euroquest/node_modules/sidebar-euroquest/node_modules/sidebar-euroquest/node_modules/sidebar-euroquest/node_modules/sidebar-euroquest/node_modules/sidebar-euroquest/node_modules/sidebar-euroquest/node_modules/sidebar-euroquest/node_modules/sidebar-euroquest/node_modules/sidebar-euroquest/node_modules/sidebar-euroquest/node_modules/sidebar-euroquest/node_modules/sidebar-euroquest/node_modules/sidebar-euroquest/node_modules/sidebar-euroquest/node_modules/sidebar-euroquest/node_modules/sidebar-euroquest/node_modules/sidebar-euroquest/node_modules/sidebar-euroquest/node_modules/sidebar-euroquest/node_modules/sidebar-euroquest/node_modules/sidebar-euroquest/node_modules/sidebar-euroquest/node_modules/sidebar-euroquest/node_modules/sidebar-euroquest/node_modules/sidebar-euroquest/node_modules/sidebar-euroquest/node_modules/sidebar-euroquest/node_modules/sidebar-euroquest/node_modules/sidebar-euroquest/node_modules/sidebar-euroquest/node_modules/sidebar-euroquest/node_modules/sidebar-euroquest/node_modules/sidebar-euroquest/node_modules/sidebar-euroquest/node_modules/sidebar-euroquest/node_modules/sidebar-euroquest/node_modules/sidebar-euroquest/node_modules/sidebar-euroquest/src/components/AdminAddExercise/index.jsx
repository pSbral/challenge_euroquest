import React from 'react';

const AddExercicio = () => {
    return (
        <div className="flex space-x-8 ml-14">
            {/* Seção da lista de exercícios */}
            <div className="w-1/3 p-4 rounded-lg shadow-md bg-white">
                {/* Mudar o nome para a trilha atual */}
                <h2 className="text-lightblue-quest font-bold text-xl mb-2">Nome da Trilha</h2>
                <input
                    type="text"
                    value="Inteligência de Negócios - TI"
                    className="w-full p-2 mb-4 border rounded-lg"
                    disabled
                />
                <h3 className="text-lightblue-quest font-bold mb-2">Exercícios</h3>
                <ul className="list-none">
                    <li className="flex justify-between items-center p-2 mb-2 rounded-lg shadow-md">
                        <span className="truncate max-w-60">1. Geração automática sdadsadsadsadsadas</span>
                    </li>
                </ul>
            </div>

            {/* Seção de adicionar novo exercício */}
            <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-blue-600 font-bold text-xl mb-4">Novo Exercício</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Nome do exercício"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Tipo</label>
                        <select className="w-full p-2 border rounded-lg">
                            <option value="" disabled selected>Selecione um tipo</option>
                            <option value="mult">Múltipla Escolha</option>
                            <option value="diss">Dissertativa</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Questão</label>
                        <textarea
                            className="w-full p-2 border rounded-lg"
                            rows="3"
                            placeholder="Escreva a questão"
                        ></textarea>
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700">Primeira Alternativa</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Primeira alternativa"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700">Segunda Alternativa</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Segunda alternativa"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700">Terceira Alternativa</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Terceira alternativa"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Quarta Alternativa</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Quarta alternativa"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lightblue-quest text-white p-2 rounded-lg hover:bg-lightblue-quest-hover transition-colors"
                    >
                        Adicionar Exercício
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExercicio;
