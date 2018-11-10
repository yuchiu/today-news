export default `
  type User {
    id: Int!
    username: String!
    email: String!
  }  
  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }
  type SignUpResponse {
    ok: Boolean!
    user: User
    meta: Meta!
  }
  type SignInResponse {
    ok: Boolean!
    token: String
    meta: Meta!
  }
  type Mutation {
    signup(username: String!, email: String!, password: String!): SignUpResponse!
    signin(username: String!, password: String!): SignInResponse!
  }
`;
