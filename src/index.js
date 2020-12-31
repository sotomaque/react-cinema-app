import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import AuthProvider from './auth';
import store, {
  persistor,
} from './app/config/configureStore';
import client from './app/gql/client';

import './index.scss';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
