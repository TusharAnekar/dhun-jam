const initialRestoBar = {
  amount: {},
  location: "",
  name: "",
  charge_customers: null,
};

const restoBarReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_AMOUNT":
      return { ...state, amount: payload };
    case "SET_LOCATION":
      return { ...state, location: payload };
    case "SET_NAME":
      return { ...state, name: payload };
    case "SET_CHARGE_CUSTOMERS":
      return { ...state, charge_customers: payload };
    case "UPDATE_AMOUNT":
      return {
        ...state,
        amount: { ...state.amount, [payload.categoryNumber]: payload.value },
      };
    default:
      return state;
  }
};

export { initialRestoBar, restoBarReducer };
