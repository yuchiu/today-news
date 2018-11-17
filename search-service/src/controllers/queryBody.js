module.exports = {
  testSearchAll: () => ({
    size: 10,
    from: 0,
    query: {
      match_all: {}
    }
  }),
  searchTermQuery: (searchTerm, size) => ({
    size,
    from: 0,
    query: {
      multi_match: {
        query: searchTerm,
        fuzziness: 1,
        fields: ["title", "description"]
      }
    }
  })
};
