import { createContext, useContext, useReducer } from "react";
import {
  initialRestoBar,
  restoBarReducer,
} from "../reducers/resto-bar-reducer";
import {
  getAdminDetailsService,
  priceUpdateService,
} from "../services/dhun-jam-services";
import { useAuthContext } from "./auth-context";

const RestoBarContext = createContext();

const RestoBarProvider = ({ children }) => {
  const [restoBar, setRestoBar] = useReducer(restoBarReducer, initialRestoBar);

  const {
    auth: { id },
  } = useAuthContext();

  const getAdminDetails = async () => {
    try {
      const response = await getAdminDetailsService(id);
      const {
        status,
        data: {
          data: { amount, location, name, charge_customers },
        },
      } = response;

      if (status === 200) {
        setRestoBar({ type: "SET_AMOUNT", payload: amount });
        setRestoBar({ type: "SET_LOCATION", payload: location });
        setRestoBar({ type: "SET_NAME", payload: name });
        setRestoBar({
          type: "SET_CHARGE_CUSTOMERS",
          payload: charge_customers,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePriceUpdate = async (updatedAmount) => {
    try {
      const response = await priceUpdateService(id, updatedAmount);
      console.log(response);
      const {
        status,
        data: {
          data: { amount },
        },
      } = response;

      if (status === 200) {
        setRestoBar({ type: "SET_AMOUNT", payload: amount });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RestoBarContext.Provider
      value={{
        restoBar,
        setRestoBar,
        getAdminDetails,
        handlePriceUpdate,
      }}
    >
      {children}
    </RestoBarContext.Provider>
  );
};

const useRestoBarContext = () => useContext(RestoBarContext);

export { RestoBarProvider, useRestoBarContext };
