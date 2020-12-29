import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AuthProvider from './auth';

import HomePage from './app/pages/Home';
import LoginPage from './app/pages/Login';
import RegisterPage from './app/pages/Register';

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
          <Route
            path="/login"
            render={() => <LoginPage />}
          />
          <Route
            path="/register"
            render={() => <RegisterPage />}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
