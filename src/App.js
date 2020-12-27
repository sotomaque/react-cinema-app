import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import HomePage from './app/pages/Home';
import NowPlayingPage from './app/pages/NowPlaying/index';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route
          path="/now_playing"
          render={() => <NowPlayingPage />}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
