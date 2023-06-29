import { Link } from "react-router-dom";
import "../checkoutButton.css";

const CheckoutButton = () => {
  let checkoutCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  return (
    <div className="checkout-button">
      <Link to="/checkout" className="checkout-button-link">
        Cart
      </Link>
    </div>
  );
};

export default CheckoutButton;
