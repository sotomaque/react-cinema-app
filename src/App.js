import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import HomePage from './app/pages/Home';
import LoginPage from './app/pages/Login';
import RegisterPage from './app/pages/Register';
import { AuthContext } from './auth';

const App = () => {
  const { authState } = React.useContext(AuthContext);
  const isAuth = authState?.status === 'in';
  if (!isAuth) {
    // use un auth routes
    return (
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

          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }

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
