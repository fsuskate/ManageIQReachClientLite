import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Service from './components/Service';
import Catalog from './components/Catalog';
import Login from './components/Login';
import NotFound from './components/NotFound';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/service' exact component={Service} />
        <Route path='/catalog' exact component={Catalog} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Login} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
