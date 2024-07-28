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

  type TestOneQuestions {
    id: Int!
    text: String!
    position: Int!
  }

  type TestOneAnswer {
    id: Int!
    answer: Int
    TestOneQuestions: TestOneQuestions!
  }

  type TestOneProcess {
    id: Int!
    complete: Boolean!
    startDate: String!
    endDate: String
    TestOneAnswer: [TestOneAnswer!]!
    User: User!
  }

  type Query {
    # Auth #
    login(login: String!, password: String!): LoginResponse
    # ==== #

    getUsersRoles: [Role]
    getUsers(roleId: Int): [User]
    getUser: User

    getTestOneProcess: [TestOneProcess]
    getTestOneQuestions: [TestOneQuestions!]
    getTestOne(userId: Int!): TestOneProcess
  }

  type Mutation {
    # Auth
    registration(login: String!, password: String!, roleId: Int!): Token
    deleteUser(userId: Int!): Boolean
    # ====

    # Test one
    startTestOne(userId: Int!): TestOneProcess
    ansTestOne(processId: Int!, questionId: Int!, ans: Int!): TestOneProcess
    completeTestOne(processId: Int!): TestOneProcess
    # ====
  }
`;

export default typeDefs;
