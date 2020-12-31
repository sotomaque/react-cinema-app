import { gql } from 'apollo-boost';

/**
 * Create User Mutation
 *
 * variables:
 *  - name: String!
 *  - username: String!
 *  - email: String!
 */
export const CREATE_USER = gql`
  mutation createUsers(
    $name: String!
    $username: String!
    $email: String!
  ) {
    insert_users(
      objects: {
        name: $name
        username: $username
        email: $email
      }
    ) {
      affected_rows
    }
  }
`;
