import axios from "axios";

const URL = "http://localhost:3200";
const API_VERSION = "/api/v1";

export default {
  getNews: async () => {
    const payload = await axios.get(`${URL}${API_VERSION}/news`);
    return payload;
  },

  registerUser: async (email, password) => {
    const payload = await axios.post(`${URL}/auth/register`, {
      email,
      password
    });
    return payload.data;
  },

  loginUser: async (email, password) => {
    const payload = await axios.post(`${URL}/auth/login`, {
      email,
      password
    });
    return payload.data;
  }
};
