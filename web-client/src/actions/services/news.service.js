import { APIV1 } from "./API";

const newsService = {
  getNews: async currentIndex => {
    const response = await APIV1().get(`/news/${currentIndex}`);
    return response;
  }
};

export default newsService;
