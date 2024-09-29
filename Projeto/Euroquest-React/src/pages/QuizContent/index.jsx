import React, { useState, useContext } from 'react';
import { FaBackward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TopicsContext } from '../../components/TopicContext';

const QuizContent = () => {
  const { topics, setTopics } = useContext(TopicsContext); // Use o contexto
  const [currentTopic, setCurrentTopic] = useState(null);
  const [showAddTopicForm, setShowAddTopicForm] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [showAddExerciseForm, setShowAddExerciseForm] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // Estados para o novo exercício
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseType, setNewExerciseType] = useState('');
  const [newExerciseQuestion, setNewExerciseQuestion] = useState('');
  const [newExerciseAlternatives, setNewExerciseAlternatives] = useState(['', '', '', '']);
  const [newExerciseCorrectAnswer, setNewExerciseCorrectAnswer] = useState(null);

  const navigate = useNavigate();

  // Função para selecionar um tópico
  const handleTopicSelect = (topic) => {
    if (isDeleteMode) {
      handleDeleteTopic(topic.id);
    } else {
      setCurrentTopic(topic);
    }
  };

  // Função para adicionar um novo tópico
  const handleAddTopic = () => {
    if (newTopicName.trim() === '') return;

    const newTopic = {
      id: topics.length > 0 ? Math.max(...topics.map((t) => t.id)) + 1 : 1,
      name: newTopicName,
      exercises: [],
    };

    setTopics([...topics, newTopic]);
    setNewTopicName('');
    setShowAddTopicForm(false);
  };

  // Função para excluir um tópico
  const handleDeleteTopic = (topicId) => {
    const topicToDelete = topics.find((t) => t.id === topicId);
    const confirmDelete = window.confirm(
      `Tem certeza de que deseja excluir o tópico "${topicToDelete.name}"? Todos os exercícios serão excluídos.`
    );
    if (confirmDelete) {
      setTopics(topics.filter((topic) => topic.id !== topicId));
      if (currentTopic && currentTopic.id === topicId) {
        setCurrentTopic(null);
      }
      setIsDeleteMode(false);
    }
  };

  // Função para excluir um exercício
  const handleDeleteExercise = (exerciseId) => {
    const exerciseToDelete = currentTopic.exercises.find(
      (e) => e.id === exerciseId
    );
    const confirmDelete = window.confirm(
      `Tem certeza de que deseja excluir o exercício "${exerciseToDelete.name}"?`
    );
    if (confirmDelete) {
      const updatedExercises = currentTopic.exercises.filter(
        (exercise) => exercise.id !== exerciseId
      );
      const updatedTopic = { ...currentTopic, exercises: updatedExercises };
      setTopics(
        topics.map((topic) =>
          topic.id === currentTopic.id ? updatedTopic : topic
        )
      );
      setCurrentTopic(updatedTopic);
      setIsDeleteMode(false);
    }
  };

  // Função para adicionar um novo exercício
  const handleAddExercise = (e) => {
    e.preventDefault();

    if (
      newExerciseName.trim() === '' ||
      newExerciseType.trim() === '' ||
      newExerciseQuestion.trim() === '' ||
      (newExerciseType === 'mult' &&
        (newExerciseAlternatives.some((alt) => alt.trim() === '') ||
         newExerciseCorrectAnswer === null))
    ) {
      alert('Por favor, preencha todos os campos e selecione a resposta correta.');
      return;
    }

    const newExercise = {
      id:
        currentTopic.exercises.length > 0
          ? Math.max(...currentTopic.exercises.map((e) => e.id)) + 1
          : 1,
      name: newExerciseName,
      type: newExerciseType,
      question: newExerciseQuestion,
      alternatives: newExerciseType === 'mult' ? newExerciseAlternatives : [],
      correctAnswer: newExerciseType === 'mult' ? newExerciseCorrectAnswer : null,
    };

    // Atualiza os exercícios do tópico atual
    const updatedTopic = {
      ...currentTopic,
      exercises: [...currentTopic.exercises, newExercise],
    };

    // Atualiza a lista de tópicos
    setTopics(
      topics.map((topic) =>
        topic.id === currentTopic.id ? updatedTopic : topic
      )
    );

    setCurrentTopic(updatedTopic);

    // Limpa os campos do formulário
    setNewExerciseName('');
    setNewExerciseType('');
    setNewExerciseQuestion('');
    setNewExerciseAlternatives(['', '', '', '']);
    setNewExerciseCorrectAnswer(null);
    setShowAddExerciseForm(false);
  };

  // Função para selecionar um exercício
  const handleExerciseSelect = (exercise) => {
    if (isDeleteMode) {
      handleDeleteExercise(exercise.id);
    } else {
      navigate(`/quiz/${exercise.id}`);
    }
  };

  return (
    <div className="flex-1 p-6 flex flex-col">
      {!currentTopic ? (
        <>
          <h1 className="text-2xl font-bold mb-4 flex items-center">
            Selecione um Tópico
          </h1>
          <div className="flex items-center mb-4 space-x-2">
            <button
              onClick={() => {
                setShowAddTopicForm(!showAddTopicForm);
                setIsDeleteMode(false);
              }}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              {showAddTopicForm ? 'Cancelar' : 'Adicionar Tópico'}
            </button>
            <button
              onClick={() => {
                setIsDeleteMode(!isDeleteMode);
                setShowAddTopicForm(false);
              }}
              className={`${
                isDeleteMode ? 'bg-gray-500' : 'bg-red-500'
              } text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300`}
            >
              {isDeleteMode ? 'Cancelar' : 'Excluir Tópico'}
            </button>
          </div>

          {showAddTopicForm && (
            <div className="mb-6">
              <input
                type="text"
                placeholder="Nome do novo tópico"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              <button
                onClick={handleAddTopic}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Salvar Tópico
              </button>
            </div>
          )}

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
              isDeleteMode ? 'cursor-pointer' : ''
            }`}
          >
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 ${
                  isDeleteMode ? 'bg-red-100' : 'cursor-pointer'
                }`}
                onClick={() => handleTopicSelect(topic)}
              >
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-black">
                    {topic.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaBackward
                className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700 transition duration-300 mr-4"
                onClick={() => {
                  setCurrentTopic(null);
                  setIsDeleteMode(false);
                }}
              />
              <h2 className="text-3xl font-bold">
                Exercícios em {currentTopic.name}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setShowAddExerciseForm(!showAddExerciseForm);
                  setIsDeleteMode(false);
                }}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
              >
                {showAddExerciseForm ? 'Cancelar' : 'Adicionar Exercício'}
              </button>
              <button
                onClick={() => {
                  setIsDeleteMode(!isDeleteMode);
                  setShowAddExerciseForm(false);
                }}
                className={`${
                  isDeleteMode ? 'bg-gray-500' : 'bg-red-500'
                } text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300`}
              >
                {isDeleteMode ? 'Cancelar' : 'Excluir Exercício'}
              </button>
            </div>
          </div>

          {showAddExerciseForm && (
            <div className="mb-6">
              <form onSubmit={handleAddExercise}>
                <div className="mb-4">
                  <label className="block text-gray-700">Nome</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Nome do exercício"
                    value={newExerciseName}
                    onChange={(e) => setNewExerciseName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Tipo</label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={newExerciseType}
                    onChange={(e) => setNewExerciseType(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione um tipo
                    </option>
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
                    value={newExerciseQuestion}
                    onChange={(e) => setNewExerciseQuestion(e.target.value)}
                  ></textarea>
                </div>

                {newExerciseType === 'mult' && (
                  <>
                    {newExerciseAlternatives.map((alt, index) => (
                      <div className="mb-2" key={index}>
                        <label className="block text-gray-700">{`Alternativa ${index + 1}`}</label>
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder={`Alternativa ${index + 1}`}
                            value={alt}
                            onChange={(e) => {
                              const newAlternatives = [...newExerciseAlternatives];
                              newAlternatives[index] = e.target.value;
                              setNewExerciseAlternatives(newAlternatives);
                            }}
                          />
                          <input
                            type="radio"
                            name="correctAnswer"
                            value={index}
                            checked={newExerciseCorrectAnswer === index}
                            onChange={() => setNewExerciseCorrectAnswer(index)}
                            className="ml-2"
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-lightblue-quest text-white p-2 rounded-lg hover:bg-lightblue-quest-hover transition-colors"
                >
                  Adicionar Exercício
                </button>
              </form>
            </div>
          )}

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
              isDeleteMode ? 'cursor-pointer' : ''
            }`}
          >
            {currentTopic.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`bg-blue-500 text-white font-semibold p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 flex flex-col cursor-pointer ${
                  isDeleteMode ? 'bg-red-100 text-black' : ''
                }`}
                onClick={() => handleExerciseSelect(exercise)}
              >
                <h3 className="text-lg">{exercise.name}</h3>
                <p className="text-sm">{exercise.question}</p>
                {exercise.type === 'mult' && (
                  <ul className="mt-2">
                    {exercise.alternatives.map((alt, index) => (
                      <li key={index} className="text-sm">
                        {`${index + 1}. ${alt}`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContent;