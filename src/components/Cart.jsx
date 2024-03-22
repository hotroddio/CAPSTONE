import { useCartQuery, useEstoreListQuery } from "../redux/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// api
import "./styles/Cart.css";

function Cart({ token, products, setLocalCart, localCart }) {
  let { id } = useParams();
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [parsedMachineLocalCart, setParsedMachineLocalCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(null);
  const { data, error, isLoading } = useCartQuery({ token, id });

  // useEffect(() => {
  //   const init = async () => {
  //     let k = await JSON.parse(window.localStorage.getItem("localCart"));
  //     if (k) {
  //       setParsedMachineLocalCart(k);
  //     }
  //     if (
  //       products?.length > 0 &&
  //       parsedMachineLocalCart?.length === 0 &&
  //       data?.length > 0 &&
  //       k === null
  //     ) {
  //       let storedProducts = data[0].products.map((product) => {
  //         return {
  //           productId: product.productId,
  //           quantity: product.quantity,
  //         };
  //       });
  //       let parsedMachineData = storedProducts.map((storedProduct) => {
  //         const found = products.find(
  //           (product) => product.id === storedProduct.productId
  //         );
  //         return {
  //           category: found.category,
  //           description: found.description,
  //           id: found.id,
  //           image: found.image,
  //           price: found.price,
  //           rating: {
  //             rate: found.rating.rate,
  //             count: found.rating.count,
  //           },
  //           title: found.title,
  //           quantity: storedProduct.quantity,
  //         };
  //       });
  //       setParsedMachineLocalCart(parsedMachineData);
  //       setLocalCart(parsedMachineData);
  //       window.localStorage.setItem(
  //         "localCart",
  //         JSON.stringify(parsedMachineData)
  //       );
  //       console.log("subtotal", parsedMachineData);

  //       parsedMachineData?.map(
  //         (item, index) => (subTotalPrice += item?.quantity * item?.price)
  //       )

  //       totalPrice = subTotalPrice + subTotalPrice * 0.07 + 10.99;
  //     }

  //     if (localCart === null) {
  //       setLocalCart(parsedMachineLocalCart);
  //     }
  //   };
  //   init();
  // }, [localCart, loadingCart]);
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

  // useEffect(() =>{
  if (data && !loadingCart) {
    let k = JSON.parse(window.localStorage.getItem("localCart"));
    if (k) {
      setParsedMachineLocalCart(k);
    }
    if (
      (products?.length > 0 &&
        parsedMachineLocalCart?.length === 0 &&
        data?.length > 0 &&
        k === null) ||
      k?.length > 0
    ) {
      let storedProducts = data[0].products.map((product) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
        };
      });
      let parsedMachineData = storedProducts.map((storedProduct) => {
        const found = products?.find(
          (product) => product.id === storedProduct.productId
        );
        return {
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
      });
      setParsedMachineLocalCart(parsedMachineData);
      setLocalCart(parsedMachineData);
      window.localStorage.setItem(
        "localCart",
        JSON.stringify(parsedMachineData)
      );
    }

    if (localCart === null) {
      setLocalCart(parsedMachineLocalCart);
    };
  //   init();
  // }
  // }, [data, loadingCart]);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Something went wrong!!!</p>;
    }

    if (!loadingCart) {
      setLoadingCart(data);
    }
  }
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
