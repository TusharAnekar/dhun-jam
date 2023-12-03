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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RestoBarContext = createContext();

const RestoBarProvider = ({ children }) => {
  const [restoBar, setRestoBar] = useReducer(restoBarReducer, initialRestoBar);
  const navigate = useNavigate();

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
        setRestoBar({ type: "SET_UPDATED_AMOUNT", payload: amount });
        setRestoBar({ type: "SET_LOCATION", payload: location });
        setRestoBar({ type: "SET_NAME", payload: name });
        setRestoBar({
          type: "SET_CHARGE_CUSTOMERS",
          payload: charge_customers,
        });
      }
    } catch (error) {
      toast.error("Error while fetching admin details");
      console.error(error);
      navigate("/");
    }
  };

  const handlePriceUpdate = async (updatedAmount) => {
    try {
      const response = await priceUpdateService(id, updatedAmount);
      const {
        status,
        data: {
          data: { amount },
        },
      } = response;

      if (status === 200) {
        setRestoBar({ type: "SET_AMOUNT", payload: amount });
        toast.success("Updated amounts successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed updating amounts.");
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
