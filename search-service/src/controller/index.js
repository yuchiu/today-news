const searchController = {
  searchNews: async function(searchTerm, callback) {
    try {
      let response;
      response = searchTerm
      console.log(response)
      callback(null, response);
    } catch (err) {
      response = {
        meta: {
          type: "error",
          status: 500,
          message: "server error"
        }
      };
      callback(null, response);
    }
  }
};

module.exports = searchController;
