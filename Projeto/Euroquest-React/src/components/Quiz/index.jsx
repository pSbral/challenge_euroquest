import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaBackward } from 'react-icons/fa';
import { TopicsContext } from '../TopicContext';

const Quiz = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const { topics } = useContext(TopicsContext); // Use the context

  // Find the exercise based on the ID
  let exercise = null;
  topics.forEach((topic) => {
    const found = topic.exercises.find((ex) => ex.id === parseInt(exerciseId));
    if (found) {
      exercise = found;
    }
  });

  if (!exercise) {
    // If the exercise is not found, navigate back or show an error message
    navigate(-1);
    return null;
  }

  // Set up state and variables for the quiz
  const [lives, setLives] = useState(3);
  const [progress, setProgress] = useState(0);

  // Set up questions and answers for multiple-choice exercises
  const questions = [
    {
      text: exercise.question,
      answers:
        exercise.type === 'mult'
          ? exercise.alternatives.map((alt, index) => ({
              text: alt,
              correct: index === exercise.correctAnswer,
            }))
          : [],
    },
  ];

  const handleAnswerClick = (isCorrect) => {
    if (!isCorrect) {
      setLives((prevLives) => (prevLives > 1 ? prevLives - 1 : 0));
      alert(`Resposta errada! Você perdeu uma vida.`);
    } else {
      alert(`Resposta correta!`);
      setProgress(100); // Complete progress
    }
  };

  const handleSkip = () => {
    alert('Pergunta pulada.');
    setProgress(100); // Consider complete progress when skipping
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <FaBackward
          className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700 transition duration-300 mr-4"
          onClick={() => navigate(-1)} // Navigate back to the previous page
        />
        <div className="relative w-full">
          <div className="bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }} // Using progress state
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
          {exercise.name}
        </div>
        <div className="bg-blue-100 text-blue-700 p-6 rounded-b-lg text-lg">
          {exercise.question}
        </div>
      </div>

      {exercise.type === 'mult' ? (
        <div className="grid grid-cols-2 gap-4 max-h-64 mb-4 flex-grow">
          {questions[0].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer.correct)}
              className="bg-white border-2 border-blue-500 text-blue-500 font-semibold py-2 px-2 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition duration-300"
            >
              {answer.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-4">
          <textarea
            className="w-full h-40 p-4 border rounded-lg"
            placeholder="Escreva sua resposta aqui..."
          ></textarea>
          <button
            onClick={() => {
              alert('Resposta enviada!');
              setProgress(100);
            }}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Enviar Resposta
          </button>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleSkip}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 flex-1 mr-1"
        >
          Pular
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex-1 ml-1"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Quiz;
