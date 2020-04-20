import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation'
import Routes from './Routes';
import './App.css';

const UserAuthContext = React.createContext({
  user: null,
  basicAuthToken: null
})

class App extends React.Component {
  render() {
    return (
      <UserAuthContext.Provider>
        <Router>
          <Navigation />
          <div className="App Content">
            <Routes />
          </div>        
        </Router>    
      </UserAuthContext.Provider>
    );
  }
}

export { 
  App,
  UserAuthContext
}

