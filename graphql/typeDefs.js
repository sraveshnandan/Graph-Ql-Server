import { gql } from "apollo-server";
export const typeDefs = gql`
  scalar DateTime
  scalar Int

  type Options {
    title: String
    correct: Boolean
  }

  input OptionsInput {
    title: String
    correct: Boolean
  }
  type Question {
    name: String
    options: [Options]
  }

  input QuestionInput {
    name: String
    options: [OptionsInput]
  }

  type Review {
    title: String
    ratings: Int
    user: User
  }

  input ReviewInput {
    title: String
    ratings: Int
  }

  type TestUserRecords {
    user: User
    score: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Test {
    _id: ID!
    name: String
    description: String
    questions: [Question]
    ratings: Int
    users: [TestUserRecords]
    category: String
    deficulty: String
    reviews: [Review]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type User {
    _id: ID!
    name: String
    role: String
    email: String
    rank: Int
    tests: [Test]
    createdAt: DateTime
    updatedAt: DateTime
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  input TestInput {
    name: String!
    description: String!
    questions: [QuestionInput]
    category: String
    deficulty: String!
  }
  type UserwithToken {
    user: User
    token: String
  }

  type Query {
    me(id: ID!): User
    users(page: Int!): [User]
    getTest(id: ID!): Test
    tests(page: Int): [Test]
  }
  type Mutation {
    #User Mutations
    addUser(userInput: UserInput): User
    login(email: String, password: String): UserwithToken
    updateUser(id: ID!, userInput: UserInput): User!
    deleteUser(id: ID!): String!
    # tests mutation
    StartTest(testId: ID!, score: Int): String!
    addOrUpdateReview(testId: ID!, reviewInput: ReviewInput): String!
    deleteReview(reviewId: ID!, testId: ID!): String!
    createTest(testInput: TestInput): Test
    updateTest(id: ID!, testInput: TestInput): Test
    deleteTest(id: ID!): String!
  }
`;
