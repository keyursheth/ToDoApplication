import React from 'react';
import './App.css';
import TaskContainer from './Containers/TaskContainer';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <TaskContainer />
      </div>
    </Router>
  );
}

export default App;
