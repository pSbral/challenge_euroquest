import React from 'react';
import Sidebar from './Sidebar';

const areas = [
  {
    name: 'Área 1',
    trails: ['Trilha 1.1', 'Trilha 1.2', 'Trilha 1.3'],
  },
  {
    name: 'Área 2',
    trails: ['Trilha 2.1', 'Trilha 2.2'],
  },
  {
    name: 'Área 3',
    trails: ['Trilha 3.1', 'Trilha 3.2', 'Trilha 3.3'],
  },
];

function App() {
  return (
    <div className="App">
      <Sidebar areas={areas} />
      <div className="content">
        {/* Conteúdo principal da página */}
      </div>
    </div>
  );
}

export default App;
