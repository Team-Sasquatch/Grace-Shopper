import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Nav.css";

const Nav = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("user: ", user);

  // const handleSearch = (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query); // Call setSearchQuery function with the query value
  // };

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
      <div className="topnav">
        <input
          type="search"
          placeholder="Sasquatch Hunt Here...."
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
      </div>
    </nav>
  );
};

export default Nav;
