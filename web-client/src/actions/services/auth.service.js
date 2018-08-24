import API from "./API";

const authService = {
  registerUser: async credentials => {
    const response = await API().post(`/auth/register`, credentials);
    return response.data;
  },

  loginUser: async credentials => {
    const response = await API().post(`/auth/login`, credentials);
    return response.data;
  }
};

export default authService;
