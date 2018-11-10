export default `
  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }
  type Mutation {
    signup(username: String!, email: String!, password: String!): SignUpResponse!
    signin(username: String!, password: String!): SignInResponse!
  }
  type User {
    id: Int!
    username: String!
    email: String!
  }
  type SignUpResponse {
    user: User!
    token: String!
    meta: Meta!
  }
  type SignInResponse {
    user: User!
    token: String!
    meta: Meta!
  }
`;
