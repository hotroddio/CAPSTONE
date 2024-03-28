import { useEstoreListQuery } from "../redux/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  adjustQuantityFromCart,
  updateTotalQuantity,
} from "../redux/cartSlice";
// api
import "./styles/Cart.css";
function Cart({ token, products }) {
  let { id } = useParams();
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = useSelector((state) => state.cart.itemsList);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  console.log(cartItems[0]?.price);

  useEffect(() => {
    let sum = 0;
    cartItems?.map((item, index) => {
      sum += item?.quantity * item?.price;
    });
    setSubTotalPrice(sum);
  }, [cartItems]);

  useEffect(() => {
    if (subTotalPrice === 0) {
      setTotalPrice(0);
    } else {
      setTotalPrice(subTotalPrice + subTotalPrice * 0.07 + 10.99);
    }
  }, [subTotalPrice]);
  console.log(totalPrice);

  useEffect(() => {
    const newTotalQuantity = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    if (newTotalQuantity !== totalQuantity) {
      dispatch(updateTotalQuantity(newTotalQuantity));
    }
  }, [cartItems]);

  function handleDelete(e) {
    const itemIdToDelete = e.target.id;
    console.log(e);
    dispatch(removeFromCart(itemIdToDelete));
  }

  function handleQuantity(e) {
    const itemId = e.target.id;
    const item = cartItems?.find((item) => item.id === itemId * 1);
    dispatch(
      adjustQuantityFromCart({ itemId, newQuantity: item.quantity - 1 })
    );
  }

  return (
    <div>
      <h2>Cart Items</h2>
      <div className="allCartItems">
        {cartItems &&
          cartItems?.map((item, index) => (
            <div className="cartItems" key={item?.id}>
              <h2>Quantity: {item?.quantity}</h2>

              <>
                <p>Item Name: {item?.title}</p>
                <p>Item Price: ${item?.price.toFixed(2)}</p>
                <p>Category: {item?.category}</p>
                <img src={item?.image} alt={item?.title} />
              </>
              <button name="deleteItem" onClick={handleDelete} id={item?.id}>
                Remove Item from Cart
              </button>
              <button onClick={handleQuantity} id={item?.id}>
                Quantity
              </button>
            </div>
          ))}
      </div>
      <h2>Cart Sub Total: ${subTotalPrice.toFixed(2)}</h2>
      {subTotalPrice === 0 ? (
        <div>So Much Empty...</div>
      ) : (
        <h2>Cart Total with Shipping + Tax: ${totalPrice.toFixed(2)}</h2>
      )}
    </div>
  );
}

export default Cart;
