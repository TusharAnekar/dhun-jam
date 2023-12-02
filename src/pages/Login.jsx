import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

const Login = () => {
  const {
    login,
    auth: { isLoading },
  } = useAuthContext();

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginDetails);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="heading mb-8">Venu Admin Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={handleInput}
          className="rounded-lg border border-white bg-black p-2"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={handleInput}
          className="rounded-lg border border-white bg-black p-2"
        />
        <button type="submit" className="mt-4 rounded-lg bg-violet-800 p-2">
          {isLoading ? (
            <span>
              <svg
                className="... mr-3 h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
              ></svg>
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <NavLink className="mt-4">New Registration?</NavLink>
    </div>
  );
};

export { Login };
