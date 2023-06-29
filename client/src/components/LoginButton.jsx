import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <div className="login-button">
      <Link to="/login" className="login-button-link">
        Sign In
      </Link>
    </div>
  );
};

export default LoginButton;
