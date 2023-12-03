const initialRestoBar = {
  amount: {},
  location: "",
  name: "",
  charge_customers: null,
  updatedAmount: {},
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
    case "SET_UPDATED_AMOUNT":
      return { ...state, updatedAmount: payload };
    case "UPDATE_UPDATED_AMOUNT":
      return {
        ...state,
        updatedAmount: {
          ...state.updatedAmount,
          [payload.categoryNumber]: payload.value,
        },
      };
    default:
      return state;
  }
};

export { initialRestoBar, restoBarReducer };
