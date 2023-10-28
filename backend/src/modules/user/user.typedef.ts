const UserTypeDef = `
  extend type Query {
    user: User
  }

  extend type Mutation {
    loginAccount(body: LoginAccountRequest!): LoginAccountResponse!
    createAccount(body: CreateAccountRequest!): CreateAccountResponse!
  }

  type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    caughtPokemon: [UserPokemon]
    createdAt: String
    updatedAt: String
  }

  # request
  input LoginAccountRequest {
    email: String!
    password: String!
  }

  input CreateAccountRequest {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  # response
  type LoginAccountResponse {
    token: String!
  }

  type CreateAccountResponse {
    token: String!
  }

`

export default UserTypeDef;
