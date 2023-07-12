import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("user: ", user);
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
      <div class="topnav">
        <input type="text" placeholder="Sasquatch Hunt Here...." />
        <button type="submit">Submit</button>
      </div>
    </nav>
  );
};

export default Nav;
