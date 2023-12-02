const initialAuth = {
  isLoading: false,
  id: 0,
  token: "",
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "TOGGLE_IS_LOADING":
      return { ...state, isLoading: !state.isLoading };
    case "SET_ID":
      return { ...state, id: payload };
    case "SET_TOKEN":
      return { ...state, token: payload };
    default:
      return state;
  }
};

export { initialAuth, authReducer };
