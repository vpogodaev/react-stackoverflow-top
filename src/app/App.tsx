import React from 'react';
import '../styles/index.scss';
import { TopQuestions } from '@pages/TopQuestions/TopQuestions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <TopQuestions />
      </DndProvider>
    </div>
  );
}

export default App;
