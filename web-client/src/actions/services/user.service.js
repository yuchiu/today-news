import { apiV1 } from "./API";

const userService = {
  tryAutoSignIn: async () => {
    const response = await apiV1().get(`/users/auth`);
    return response;
  },
  fetchSignUpUser: async credentials => {
    const response = await apiV1().post(`/users/singup`, credentials);
    return response;
  },

  fetchSignInUser: async credentials => {
    const response = await apiV1().post(`/users/singin`, credentials);
    return response;
  },
  fetchClickLog: clickLogData => {
    apiV1().post(
      `/users/${clickLogData.userId}/news/${clickLogData.newsDigest}`
    );
  }
};

export default userService;
