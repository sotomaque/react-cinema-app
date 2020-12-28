import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from '@apollo/react-hooks';
import {
  HASURA_SECRET,
  HTTP_URL,
  WS_URL,
} from '../../const';

const httpsLink = new HttpLink({
  uri: HTTP_URL,
  headers: {
    'x-hasura-admin-secret': HASURA_SECRET,
  },
});

const wssLink = new WebSocketLink({
  uri: WS_URL,
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
