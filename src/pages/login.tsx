import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/auth-context";
import { useState } from "react";

export function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  const { logIn } = useAuthStore();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    logIn();
    navigate(from, { replace: true });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
