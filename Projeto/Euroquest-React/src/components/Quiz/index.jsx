// src/pages/Quiz.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaBackward } from 'react-icons/fa';
import SidebarUser from '../../components/SidebarUser'; // Importando a SidebarUser

const Quiz = () => {
  const { exerciseId } = useParams(); // Obtém o ID do exercício da URL
  const navigate = useNavigate();
  
  const [lives, setLives] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0); // Estado para controle de progresso

  const instructions = "Selecione a opção que melhor descreve a importância da funcionalidade principal do nosso produto.";

  // Perguntas e respostas personalizadas
  const questions = [
    {
      text: "Qual é a funcionalidade principal do nosso produto?",
      answers: [
        { text: "Entender a funcionalidade principal do produto", correct: true },
        { text: "Saber como acessar as configurações", correct: false },
        { text: "Familiarizar-se com o painel de controle", correct: false },
        { text: "Conhecer a equipe de suporte", correct: false },
      ],
    },
    // Adicione mais perguntas conforme necessário
    {
      text: "Qual a prioridade de suporte ao cliente?",
      answers: [
        { text: "Atendimento rápido e eficiente", correct: true },
        { text: "Demonstração do produto", correct: false },
        { text: "Feedback de usuários", correct: false },
        { text: "Acesso a relatórios", correct: false },
      ],
    },
  ];

  const handleAnswerClick = (isCorrect) => {
    if (!isCorrect) {
      setLives((prevLives) => (prevLives > 1 ? prevLives - 1 : 0));
      alert(`Resposta errada! Você perdeu uma vida.`);
    } else {
      alert(`Resposta correta!`);
      setProgress((prevProgress) => prevProgress + (100 / questions.length)); // Aumenta o progresso
    }

    // Avança para a próxima pergunta
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < questions.length ? nextIndex : prevIndex; // Não avança se for a última pergunta
    });
  };

  // Função para pular a pergunta
  const handleSkip = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < questions.length ? nextIndex : prevIndex; // Não avança se for a última pergunta
    });
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <div className="w-1/5">
        <SidebarUser />
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <FaBackward
            className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700 transition duration-300 mr-4"
            onClick={() => navigate(-1)} // Volta para a tela anterior
          />
          <div className="relative w-full">
            <div className="bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progress}%` }} // Usando o estado de progresso
              />
            </div>
          </div>
          <div className="flex ml-4">
            {Array.from({ length: lives }).map((_, index) => (
              <FaHeart key={index} className="mr-1 text-red-500" />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-blue-500 text-white text-lg font-bold py-2 px-4 rounded-lg">
            Questionário do Exercício {exerciseId}
          </div>
          <div className="bg-blue-100 text-blue-700 p-6 rounded-b-lg text-lg">
            {instructions}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-h-64 mb-4 flex-grow">
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer.correct)}
              className="bg-white border-2 border-blue-500 text-blue-500 font-semibold py-2 px-2 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition duration-300"
            >
              {answer.text}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSkip}
            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 flex-1 mr-1"
          >
            Pular
          </button>
          <button
            onClick={() => handleAnswerClick(true)} // Chama a função de resposta correta, se necessário
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex-1 ml-1"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
