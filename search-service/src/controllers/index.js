const searchController = {
  searchNews: async function(searchTerm, callback) {
    try {
      let response;
      response = {
        meta: {
          type: "success",
          status: 200,
          message: ""
        },
        searchResult:{
          title:"dads", desc:"dsada asd a"
        }
      }
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
