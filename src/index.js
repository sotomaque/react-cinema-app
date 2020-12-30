import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';

import App from './App';
import AuthProvider from './auth';
import store from './app/config/configureStore';
import client from './app/gql/client';

import './index.scss';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
