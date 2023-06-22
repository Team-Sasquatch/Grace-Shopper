import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/auth";
import useAuth from "../hooks/useAuth";

export default function AuthForm() {
  const { pathname } = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let result;
      if (pathname === "/register") {
        result = await registerUser(username, password);
        if (result.user) {
          nav("/login");
        }
      } else {
        result = await loginUser(username, password);
        if (result.user) {
          setLoggedIn(true);
          setUser(result.user);
          nav("/");
        }
      }
    } catch (error) {
      console.log("Error with registration: ", error);
    }
  }

  return (
    <div>
      {pathname === "/register" ? (
        <div>
          <h1>Registering a new user</h1>
          <h3>Enter new user info</h3>
        </div>
      ) : (
        <div>
          <h1>Log in</h1>
          <h3>Enter user info</h3>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Submit</button>
        {error ? <p style={{ color: "light blue" }}>{error}</p> : null}
        <Link to="/">Return to Login Page</Link>
      </form>
    </div>
  );
}
