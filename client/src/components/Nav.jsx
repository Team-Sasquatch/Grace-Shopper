import { Link, useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav">
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
