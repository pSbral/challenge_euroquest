import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeContent from './pages/HomeContent';
import DocumentsContent from './pages/DocumentsContent';
import SettingsContent from './pages/SettingsContent';
import QuizContent from './pages/QuizContent';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotas Filhas */}
          <Route index element={<HomeContent />} />
          <Route path="documents" element={<DocumentsContent />} />
          <Route path="settings" element={<SettingsContent />} />
          <Route path="quest" element={<QuizContent />} />
          <Route path="quiz/:exerciseId" element={<QuizContent />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
