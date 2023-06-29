import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Nav = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("user: ",user)
  return (
    <nav className="nav">
      <h3 className="navbar__username">Hi, {user.username}</h3>
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/products">
        All Products
      </Link>
      <Link className="nav-link" to="/sports">
        Sports
      </Link>
      <Link className="nav-link" to="/supplements">
        Supplements
      </Link>
      <Link className="nav-link" to="/equipment">
        Equipment
      </Link>
      <Link className="nav-link" to="/apparel">
        Apparel
      </Link>
    </nav>
  );
};

export default Nav;
