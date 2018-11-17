import { apiV1 } from "./API";

const searchService = {
  fetchSearchNews: async searchTerm => {
    const response = await apiV1().get(`/search/${searchTerm}`);
    return response;
  }
};

export default searchService;
