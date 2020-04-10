import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';

import Navigation from './components/Navigation'
import Routes from './Routes';

import './App.css';

function App() {
  return (
    <Router>
      <Security issuer='https://dev-926285.okta.com/'
                redirectUri = 'http://localhost:8080/implicit/callback'
                clientId = '0oa29myzv8HAb1XO3357'>
        <div className="App">
          <div className="App-header">
            <Navigation />
          </div>        
          <Routes />
        </div>  
      </Security>
    </Router>    
  );
}

export default App;
