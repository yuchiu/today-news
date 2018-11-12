import { searchService } from "../config/rpcClient";

const searchController = {
  searchNews: (req, res) => {
    const { searchTerm } = req.params;

    searchService.request("searchNews", { searchTerm }, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          meta: {
            type: "error",
            status: 500,
            message: "server error"
          }
        });
      }

      const searchServiceResponse = response.result;
      res.status(searchServiceResponse.meta.status).send(searchServiceResponse);
    });
  }
};

export default searchController;
