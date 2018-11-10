export default {
  Query: {
    getUser: (schema, { id }) => console.log(`user: ${id}`),
    allUsers: (schema, args) => console.log("all users")
  },
  Mutation: {
    signup: (schema, credentials) => console.log(credentials),
    signin: async (schema, credentials) => console.log(credentials)
  }
};
