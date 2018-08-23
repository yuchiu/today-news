const auth = {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  authenticateUser: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("email", user.email);
    localStorage.setItem("username", user.username);
  },

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  isUserAuthenticated: () => localStorage.getItem("token") !== null,

  /**
   * Deauthenticate a user. Remove token and email from Local Storage.
   *
   */
  deauthenticateUser: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
  },
  /**
   * Get a token value.
   *
   * @returns {string}
   */
  getToken: () => localStorage.getItem("token"),

  /**
   * Get email.
   *
   * @returns {string}
   */
  getEmail: () => localStorage.getItem("email"),

  /**
   * Get username.
   *
   * @returns {string}
   */
  getUsername: () => localStorage.getItem("username"),

  /**
   * Get username.
   *
   * @returns {string}
   */
  getUserId: () => localStorage.getItem("userId")
};

export default auth;
