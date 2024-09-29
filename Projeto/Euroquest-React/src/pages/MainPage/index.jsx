import React, { useState } from 'react';
import HomeContent from '../HomeContent';
import DocumentsContent from '../DocumentsContent';
import QuizContent from '../QuizContent';
import SettingsContent from '../SettingsContent';
import SidebarUser from '../../components/SidebarUser';


const MainPage = () => {
  const [selectedPage, setSelectedPage] = useState('Home');

  const renderContent = () => {
    switch (selectedPage) {
      case 'Home':
        return <HomeContent onSelectPage={setSelectedPage} />;
      case 'Documents':
        return <DocumentsContent />;
      case 'Quiz':
        return <QuizContent />;
      case 'Settings':
        return <SettingsContent />;
      default:
        return <HomeContent onSelectPage={setSelectedPage} />;
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <div className="w-1/5">
        <SidebarUser selectedPage={selectedPage} onSelectPage={setSelectedPage} />
      </div>
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default MainPage;
