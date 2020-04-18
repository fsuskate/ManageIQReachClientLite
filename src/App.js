import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation'
import Routes from './Routes';
import './App.css';

const UserAuthContext = React.createContext(null)
const UserIdContext = React.createContext(null)

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation />
        <div className="App Content">
          <Routes />
        </div>        
      </Router>    
    );
  }
}

export { 
  App,
  UserAuthContext,
  UserIdContext
}

