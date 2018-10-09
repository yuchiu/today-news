import { APIV1 } from "./API";

const userService = {
  autoAuth: async () => {
    const response = await APIV1().get(`/users/auth`);
    return response;
  },
  registerUser: async credentials => {
    const response = await APIV1().post(`/users/singup`, credentials);
    return response;
  },

  loginUser: async credentials => {
    const response = await APIV1().post(`/users/singin`, credentials);
    return response;
  }
};

export default userService;
