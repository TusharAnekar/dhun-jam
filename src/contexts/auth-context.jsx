import { createContext, useContext, useReducer } from "react";
import { authReducer, initialAuth } from "../reducers/auth-reducer";
import { loginService } from "../services/dhun-jam-services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useReducer(authReducer, initialAuth);
  const navigate = useNavigate();

  const login = async ({ username, password }) => {
    setAuth({ type: "TOGGLE_IS_LOADING" });
    try {
      const response = await loginService(username, password);
      const { status, data } = response;

      if (status === 200) {
        setAuth({ type: "TOGGLE_IS_LOADING" });
        setAuth({ type: "SET_ID", payload: data.data.id });
        setAuth({ type: "SET_TOKEN", payload: data.data.token });
        navigate("/dashboard");
        toast.success("Logged in successfully");
      }
    } catch (error) {
      setAuth({ type: "TOGGLE_IS_LOADING" });
      toast.error("Logged in failed");
      console.error(error);
    }
  };

  const logout = () => {
    setAuth({ type: "SET_ID", payload: 0 });
    setAuth({ type: "SET_TOKEN", payload: "" });
    toast.success("Logout successfully.");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
