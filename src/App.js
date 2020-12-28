import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import HomePage from './app/pages/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
