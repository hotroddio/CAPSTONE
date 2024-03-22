import { useEstoreListQuery } from "../redux/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// api
import "./styles/Cart.css";

function Cart({ token, products }) {
  let { id } = useParams();
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let sum = 0;
    parsedMachineLocalCart?.map((item, index) => {
      sum += item?.quantity * item?.price;
    });
    setSubTotalPrice(sum);
  }, [parsedMachineLocalCart]);

  useEffect(() => {
    setTotalPrice(subTotalPrice + subTotalPrice * 0.07 + 10.99);
  }, [subTotalPrice]);


 
  function handleDelete(e) {
    const itemIdToDelete = e.target.id;
    const filteredCart = parsedMachineLocalCart.filter(
      (item) => item.id !== itemIdToDelete * 1
    );
    window.localStorage.setItem("localCart", JSON.stringify(filteredCart));
    setParsedMachineLocalCart(filteredCart);
  }


  return (
    <div>
      <h2>Cart Items</h2>
      <div className="allCartItems">
        {parsedMachineLocalCart &&
          parsedMachineLocalCart?.map((item, index) => (
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
            </div>
          ))}
      </div>
      <h2>Cart Sub Total: ${subTotalPrice.toFixed(2)}</h2>
      <h2>Cart Total with Shipping + Tax: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;
