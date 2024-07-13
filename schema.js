import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Timestamp
  scalar date
  scalar Upload

  type Role {
    id: Int!
    title: String!
  }

  type User {
    id: Int!
    login: String!
    Role: Role!
  }

  type Token {
    token: String!
  }

  type LoginResponse {
    token: String!
  }

  type Query {
    # Auth
    login(login: String!, password: String!): LoginResponse
    # ====

    getUsersRoles: [Role]
    getUsers(roleId: Int): [User]
    getUser: User
  }

  type Mutation {
    # Auth
    registration(login: String!, password: String!, roleId: Int!): Token
    deleteUser(userId: Int!): Boolean
    # ====
  }
`;

export default typeDefs;
