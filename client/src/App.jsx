import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import LoginButton from "./components/LoginButton";
import AuthForm from "./components/AuthForm";
import SportsComponent from "./components/Sports";

//comment
//comment 2
function App() {
  const [healthMsg, setHealthMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw {
            message: "Api is Down 😭",
          };
        }
        const { message } = await response.json();
        setHealthMsg(message);
      } catch (error) {
        setErr(error.message);
      }
    }
    checkHealth();
  }, []);

  return (
    <div>
      <h1>Sasquatch Sports</h1>
      {healthMsg && <p>{healthMsg}</p>}
      {err && <p>{err}</p>}
      <Nav />
      <LoginButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/sports" element={<SportsComponent />} />
      </Routes>
    </div>
  );
}

export default App;
