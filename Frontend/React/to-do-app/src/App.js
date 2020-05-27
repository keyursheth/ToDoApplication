import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

import TestBootstrap from './TestBootstarp';


function App() {
  return (
    <Router>
      <div style={{height: '100%'}}>
        <TestBootstrap />
      </div>
    </Router>
  );
}

export default App;
