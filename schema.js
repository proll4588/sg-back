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

  type TestTwoQuestions {
    id: Int!
    text: String!
    position: Int!
  }

  type TestOneAnswer {
    id: Int!
    answer: Int
    TestOneQuestions: TestOneQuestions!
  }

  type TestTwoAnswer {
    id: Int!
    answer: Boolean
    TestTwoQuestions: TestTwoQuestions!
  }

  type TestOneProcess {
    id: Int!
    complete: Boolean!
    startDate: String!
    endDate: String
    TestOneAnswer: [TestOneAnswer!]!
    User: User!
  }

  type TestTwoProcess {
    id: Int!
    complete: Boolean!
    startDate: String!
    endDate: String
    TestTwoAnswer: [TestTwoAnswer!]!
    User: User!
  }

  type Query {
    # Auth #
    login(login: String!, password: String!): LoginResponse
    # ==== #

    getUsersRoles: [Role]
    getUsers(roleId: Int): [User]
    getUser: User

    # Test one #
    getTestOneProcess: [TestOneProcess]
    getTestOneQuestions: [TestOneQuestions!]
    getTestOne(userId: Int!): TestOneProcess
    # ======== #

    # Test two #
    getTestTwoProcess: [TestTwoProcess]
    getTestTwoQuestions: [TestTwoQuestions!]
    getTestTwo(userId: Int!): TestTwoProcess
    # ======== #
  }

  type Mutation {
    # Auth #
    registration(login: String!, password: String!, roleId: Int!): Token
    deleteUser(userId: Int!): Boolean
    # ==== #

    # Test one #
    startTestOne(userId: Int!): TestOneProcess
    ansTestOne(processId: Int!, questionId: Int!, ans: Int!): TestOneProcess
    completeTestOne(processId: Int!): TestOneProcess
    # ======== #

    # Test two #
    startTestTwo(userId: Int!): TestTwoProcess
    ansTestTwo(processId: Int!, questionId: Int!, ans: Boolean!): TestTwoProcess
    completeTestTwo(processId: Int!): TestTwoProcess
    # ======== #
  }
`;

export default typeDefs;
