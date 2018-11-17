module.exports = {
  testSearchAll: () => ({
    size: 10,
    from: 0,
    query: {
      match_all: {}
    }
  }),
  search: (searchTerm, size) => ({
    size,
    from: 0,
    query: {
      multi_match: {
        query: searchTerm,
        fuzziness: 2,
        fields: ["title", "description"]
      }
    }
  })
  //   suggest: (text, field, size) => ({
  //     text,
  //     suggester: {
  //       term: {
  //         field,
  //         size
  //       }
  //     }
  //   })
};
