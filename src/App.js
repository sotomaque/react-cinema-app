import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import HomePage from './app/pages/Home';
import NowPlayingPage from './app/pages/NowPlaying';
import TopRatedPage from './app/pages/TopRated';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route
          path="/now_playing"
          render={() => <NowPlayingPage />}
        />
        <Route
          path="/top_rated"
          render={() => <TopRatedPage />}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
