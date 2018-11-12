import { searchService } from "../config/rpcClient";

const newsController = {
  searchNews: async (req, res) => {
    const { searchTerm } = req.params;
    console.log(searchTerm);
  }
};

export default newsController;
