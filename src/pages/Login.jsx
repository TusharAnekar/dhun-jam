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

  const [isShowPassword, setIsShowPassword] = useState(false);

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

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={handleInput}
          className="w-full rounded-lg border border-white bg-black p-2"
        />
        <div className="relative flex">
          <input
            placeholder="Password"
            name="password"
            type={isShowPassword ? "text" : "password"}
            required
            onChange={handleInput}
            className="w-full rounded-lg border border-white bg-black p-2"
          />
          {isShowPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="absolute right-0 top-0 mx-2 h-full w-6 cursor-pointer"
              onClick={() => setIsShowPassword((prev) => !prev)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute right-0 top-0  mx-2 h-full w-6 cursor-pointer"
              onClick={() => setIsShowPassword((prev) => !prev)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
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
