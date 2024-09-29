// src/TopicsContext.js
import React, { createContext, useState } from 'react';

export const TopicsContext = createContext();

export const TopicsProvider = ({ children }) => {
  const [topics, setTopics] = useState([
    {
      id: 1,
      name: 'Introdução ao Produto',
      exercises: [
        {
          id: 1,
          name: 'Exercício 1',
          type: 'diss',
          question: 'Descreva as principais características do produto.',
          alternatives: [],
        },
        {
          id: 2,
          name: 'Exercício 2',
          type: 'mult',
          question: 'Qual é a cor principal do nosso produto?',
          alternatives: ['Azul', 'Verde', 'Vermelho', 'Amarelo'],
          correctAnswer: 0, // Índice da resposta correta
        },
      ],
    },
    // Adicione outros tópicos conforme necessário
  ]);

  return (
    <TopicsContext.Provider value={{ topics, setTopics }}>
      {children}
    </TopicsContext.Provider>
  );
};
