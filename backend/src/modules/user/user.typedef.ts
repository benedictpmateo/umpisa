const UserTypeDef = `
  extend type Query {
    user: User
    rankings: [Ranking!]!
  }

  extend type Mutation {
    loginAccount(body: LoginAccountRequest!): LoginAccountResponse!
    createAccount(body: CreateAccountRequest!): CreateAccountResponse!
    updateAccount(body: UpdateAccountRequest!): UpdateAccountResponse!
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

  input UpdateAccountRequest {
    userId: String!
    email: String!
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

  type UpdateAccountResponse {
    status: Boolean!
  }

  type Ranking {
    userId: String!
    firstName: String!
    lastName: String!
    numberOfPokemons: Int!
  }

`

export default UserTypeDef;
