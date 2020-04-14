import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation'
import Routes from './Routes';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Navigation />
        </div>        
        <Routes />
      </div>        
    </Router>    
  );
}

export default App;
