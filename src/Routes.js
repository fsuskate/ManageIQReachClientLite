import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Home} />
        <SecureRoute path='/login' component={Login} />
        <Route path="/implicit/callback" component={ImplicitCallback} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
