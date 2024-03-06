import { useCartQuery, useEstoreListQuery } from "../redux/api";
import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// api

function Cart({ token, products }) {
  let { id } = useParams();
  let subTotalPrice = 0;
  let totalPrice = 0;

  const { data, error, isLoading } = useCartQuery({ token, id });

  console.log("DATA from API", data);
  console.log("Error from API", error);
  console.log("isLoading", isLoading);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!!!</p>;
  }

  let storedProductIds = data[0].products.map((product) => {
    return product.productId;
  });

  console.log(storedProductIds);

  const cartMatch = products.filter((product) =>
    storedProductIds.includes(product.id)
  );

  console.log(cartMatch);

  data[0].products.map(
    (item, index) => (subTotalPrice += item?.quantity * cartMatch[index]?.price)
  );

  totalPrice = subTotalPrice + subTotalPrice * 0.07 + 10.99;

  return (
    <div>
      <h2>Cart Items</h2>
      {data[0].products.map((item, index) => (
        <div key={item?.productId}>
          <h2>Quantity: {item?.quantity}</h2>
          {/* Dynamically display item information */}
          {cartMatch[index] && (
            <>
              <p>Item Name: {cartMatch[index]?.title}</p>
              <p>Item Price: ${cartMatch[index]?.price.toFixed(2)}</p>
              <p>Category: {cartMatch[index]?.category}</p>
              <img
                src={cartMatch[index]?.image}
                alt={cartMatch[index]?.title}
              />
            </>
          )}
        </div>
      ))}
      <h2>Cart Sub Total: ${subTotalPrice.toFixed(2)}</h2>
      <h2>Cart Total with Shipping + Tax: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;
