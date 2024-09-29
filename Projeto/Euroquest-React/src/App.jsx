// src/App.js
import React from 'react';
import AppRouter from './Router';
import { TopicsProvider } from './components/TopicContext'; 

const App = () => {
  return (
    <TopicsProvider>
      <AppRouter />
    </TopicsProvider>
  );
};

export default App;
