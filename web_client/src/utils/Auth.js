export default {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   * @param {string} email
   */
  authenticateUser: (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
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
    localStorage.removeItem("email");
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
  getEmail: () => localStorage.getItem("email")
};
