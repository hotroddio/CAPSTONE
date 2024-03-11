import { useCartQuery, useEstoreListQuery } from "../redux/api";
import { useParams } from "react-router-dom";
import { useState } from "react";
// api

function Cart({ token, products, setLocalCart, localCart }) {
  let { id } = useParams();
  let subTotalPrice = 0;
  let totalPrice = 0;
  // const [localCart, setLocalCart] = useState(null);

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

  console.log(products);

  if (products?.length > 0 && data?.length > 0) {
    let storedProducts = data[0].products.map((product) => {
      return {
        productId: product.productId,
        quantity: product.quantity,
      };
    });
    if (localCart === null) {
      setLocalCart([]);
      storedProducts.map((storedProduct) => {
        const found = products.find(
          (product) => product.id === storedProduct.productId
        );
        const newProduct = {
          category: found.category,
          description: found.description,
          id: found.id,
          image: found.image,
          price: found.price,
          rating: {
            rate: found.rating.rate,
            count: found.rating.count,
          },
          title: found.title,
          quantity: storedProduct.quantity,
        };
        // console.log("****", newProduct);
        setLocalCart((localCart) => [...localCart, newProduct]);
      });
    }

    console.log(localCart);

    localCart?.map(
      (item, index) => (subTotalPrice += item?.quantity * item?.price)
    );

    totalPrice = subTotalPrice + subTotalPrice * 0.07 + 10.99;
  } else {
    return <p>Cart Empty</p>;
  }

  console.log("right here", products);

  return (
    <div>
      <h2>Cart Items</h2>
      {localCart?.map((item, index) => (
        <div key={item?.id}>
          <h2>Quantity: {item?.quantity}</h2>

          <>
            <p>Item Name: {item?.title}</p>
            <p>Item Price: ${item?.price.toFixed(2)}</p>
            <p>Category: {item?.category}</p>
            <img src={item?.image} alt={item?.title} />
          </>
        </div>
      ))}
      <h2>Cart Sub Total: ${subTotalPrice.toFixed(2)}</h2>
      <h2>Cart Total with Shipping + Tax: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;
