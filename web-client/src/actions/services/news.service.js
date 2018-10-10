import { apiV1 } from "./API";

const newsService = {
  getNews: async currentIndex => {
    const response = await apiV1().get(`/news/${currentIndex}`);
    return response;
  }
};

export default newsService;
