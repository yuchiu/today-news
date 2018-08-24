import axios from "axios";
import { auth } from "../../utils";

const API = () =>
  axios.create({
    baseURL: `http://localhost:3200`,
    headers: {
      Authorization: `Bearer ${auth.getToken()}`
    }
  });

export default API;
