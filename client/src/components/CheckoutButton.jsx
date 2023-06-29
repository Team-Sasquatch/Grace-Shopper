import { Link } from "react-router-dom";
import "../checkoutButton.css";

const CheckoutButton = () => {
  return (
    <div className="checkout-button">
      <Link to="/checkout" className="checkout-button-link">
        Cart
      </Link>
    </div>
  );
};

export default CheckoutButton;
