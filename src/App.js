import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import HomePage from './app/pages/Home';
import AuthProvider from './auth';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomePage />}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
