import { APIV1 } from "./API";

const userPath = "/users";

const userService = {
  autoAuth: async () => {
    const response = await APIV1().get(`${userPath}/auth`);
    return response;
  },
  registerUser: async credentials => {
    const response = await APIV1().post(`${userPath}`, credentials);
    return response;
  },

  loginUser: async credentials => {
    const response = await APIV1().post(
      `${userPath}/${credentials.username}`,
      credentials
    );
    return response;
  }
};

export default userService;
