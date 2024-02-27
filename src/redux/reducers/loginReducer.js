const initialState = {};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login-case":
      return { login: action.payload };
    default:
      return { ...state };
  }
};

export default loginReducer;
