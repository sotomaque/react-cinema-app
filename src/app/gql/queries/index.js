import { gql } from 'apollo-boost';

/**
 * Hello World Query
 *
 */
export const NUMBER_OF_USERS_QUERY = gql`
  query NumberOfUsersQuery {
    users_aggregate {
      aggregate {
        count
      }
    }
  }
`;
