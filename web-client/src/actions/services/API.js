import axios from "axios";
import { localStore } from "../../utils";

const API = () =>
  axios.create({
    baseURL: `http://localhost:3200`,
    headers: {
      Authorization: `Bearer ${localStore.getToken()}`
    }
  });

export default API;
