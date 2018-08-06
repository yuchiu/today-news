import constants from "../constants";

const initialState = {
  news: null
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case constants.FETCH_NEWS:
      newState.news = newState.news
        ? newState.news.concat(action.payload.data)
        : action.payload.data;
      return newState;
    default:
      return state;
  }
};

// // Post login data
// fetch("http://localhost:3000/auth/login", {
//   method: "POST",
//   cache: false,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     email,
//     password
//   })
// }).then(response => {
//   if (response.status === 200) {
//     this.setState({
//       errors: {}
//     });

//     response.json().then(json => {
//       console.log(json);
//       auth.authenticateUser(json.token, email);
//       const { history } = this.props;
//       history.push("/");
//     });
//   } else {
//     console.log("Login failed");
//     response.json().then(json => {
//       const errors = json.errors ? json.errors : {};
//       errors.summary = json.message;
//       this.setState({ errors });
//     });
//   }
// });
