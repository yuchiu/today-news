import API from "./API";

const authService = {
  autoAuth: async () => {
    const response = await API().get(`/auth/auto-auth`);
    return response;
  },
  registerUser: async credentials => {
    const response = await API().post(`/auth/register`, credentials);
    return response;
  },

  loginUser: async credentials => {
    const response = await API().post(`/auth/login`, credentials);
    return response;
  }
};

export default authService;
