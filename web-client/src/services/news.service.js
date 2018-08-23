import API from "./API";

const API_VERSION = "/api/v1";

const newsService = {
  getNews: async () => {
    const response = await API().get(`${API_VERSION}/news`);
    return response;
  }
};

export default newsService;
