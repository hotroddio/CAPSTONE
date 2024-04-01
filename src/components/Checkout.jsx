import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useEffect } from "react";
import Thumbs_up from "../assets/Thumbs_up.jpg";

function Checkout() {
  return (
    <section>
      <h1>Thank You For Shopping at Store America!!!</h1>
      <img src={Thumbs_up} />
      <h2>You're Items will arrive to the registered address soon!</h2>
      <Link to={`/estore`}>More Shopping</Link>
    </section>
  );
}

export default Checkout;
