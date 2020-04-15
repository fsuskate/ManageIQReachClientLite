import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation'
import Routes from './Routes';

import './App.css';

const UserAuthContext = React.createContext(null)
const UserNameContext = React.createContext(null)
const UserIdContext = React.createContext(null)

class App extends React.Component {
  render() {
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
}

export { 
  App,
  UserAuthContext,
  UserNameContext,
  UserIdContext
}

