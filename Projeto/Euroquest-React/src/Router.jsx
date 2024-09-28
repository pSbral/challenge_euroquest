// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Documents from './pages/docPage';
import Settings from './pages/settingsPage';
import Quest from './pages/quizPage';
import Quiz from './components/Quiz';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quest" element={<Quest />} /> 
        <Route path="/quiz/:exerciseId" element={<Quiz />} /> 
        <Route path="/documents" element={<Documents />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
