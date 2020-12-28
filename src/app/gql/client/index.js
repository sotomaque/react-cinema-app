import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from '@apollo/react-hooks';
import {
  HASURA_SECRET,
  HTTPS_URL,
  WSS_URL,
} from '../../const';

const httpsLink = new HttpLink({
  uri: HTTPS_URL,
  headers: {
    'x-hasura-admin-secret': HASURA_SECRET,
  },
});

const wssLink = new WebSocketLink({
  uri: WSS_URL,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': HASURA_SECRET,
      },
    },
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wssLink,
  httpsLink,
);

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
};

const client = createApolloClient();

export default client;
