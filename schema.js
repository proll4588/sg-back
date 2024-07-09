import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Timestamp
  scalar date
  scalar Upload

  type Role {
    id: Int!
    title: String!
  }

  type Token {
    token: String!
  }

  type Query {
    login(login: String!, password: String!): Token
    getUsersRoles: [Role]
  }

  type Mutation {
    registration(login: String!, password: String!, roleId: Int!): Token
  }
`;

export default typeDefs;
