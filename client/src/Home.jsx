import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Sasquatch Sports!</h1>
      <p>Shop like a Squatch</p>
      <div>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
