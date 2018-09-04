import { APIV1 } from "./API";

const newsPath = "/news";

const newsService = {
  getNews: async () => {
    const response = await APIV1().get(`${newsPath}`);
    return response;
  }
};

export default newsService;
