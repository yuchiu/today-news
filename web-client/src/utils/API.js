import axios from "axios";

const URL = "http://localhost:3200";
const API_VERSION = "/api/v1";

export default {
  getNews: () =>
    axios
      .get(`${URL}${API_VERSION}/news`)
      .then(response => response)
      .catch(err => err)
};
