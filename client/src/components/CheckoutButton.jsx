import { Link } from "react-router-dom";

const CheckoutButton = () => {
  return (
    <div className="checkout-button">
      <Link to="/checkout" className="button-link">
        Cart
      </Link>
    </div>
  );
};

export default CheckoutButton;
