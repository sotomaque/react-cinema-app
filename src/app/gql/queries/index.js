import { gql } from 'apollo-boost';

export const NUMBER_OF_USERS_QUERY = gql`
  query NumberOfUsersQuery {
    users_aggregate {
      aggregate {
        count
      }
    }
  }
`;
