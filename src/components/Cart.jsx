import { useCartQuery, useEstoreListQuery } from "../redux/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// api

function Cart({ token, products, setLocalCart, localCart }) {
  let { id } = useParams();
  let subTotalPrice = 0;
  let totalPrice = 0;
  const [parsedMachineLocalCart, setParsedMachineLocalCart] = useState([]);    
  const [loadingCart, setLoadingCart] = useState(null);

  useEffect(() => {
    const init = async() => {
    let k = await JSON.parse(window.localStorage.getItem("localCart"));
    console.log("k",k);
    if(k) {
      setParsedMachineLocalCart(k);
    }    
    console.log(products);
    console.log(parsedMachineLocalCart);
    console.log(data);
    console.log("if conditional", products?.length > 0 && parsedMachineLocalCart?.length === 0 && data?.length > 0 && !k);
    if (products?.length > 0 && parsedMachineLocalCart?.length === 0 && data?.length > 0 && !k) {
      let storedProducts = data[0].products.map((product) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
        };
      });
      let parsedMachineData = storedProducts.map((storedProduct) => {
        const found = products.find(
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
        console.log("*****", parsedMachineData);
        setParsedMachineLocalCart(parsedMachineData);
        setLocalCart(parsedMachineData);
        window.localStorage.setItem("localCart", JSON.stringify(parsedMachineData));
        console.log("subtotal",parsedMachineData);
      parsedMachineData?.map(
        (item, index) => (subTotalPrice += item?.quantity * item?.price)
      );
  
      totalPrice = subTotalPrice + subTotalPrice * 0.07 + 10.99;
    } 
  
    if(localCart === null) {
      setLocalCart(parsedMachineLocalCart);
    }
  } 
  init()
},[localCart, loadingCart])

  const { data, error, isLoading } = useCartQuery({ token, id });
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!!!</p>;
  }
    
  if(!loadingCart) {setLoadingCart(data)}
  

  // if(parsedMachineLocalCart?.length === 0 ) {
  //   setParsedMachineLocalCart(data);
  //  }

console.log(parsedMachineLocalCart);

  

  function handleDelete(e) {
    const itemIdToDelete = e.target.id;
    console.log(e.target.id);
    const filteredCart = parsedMachineLocalCart.filter((item) => item.id !== itemIdToDelete*1);
    console.log(filteredCart);
    window.localStorage.setItem("localCart", JSON.stringify(filteredCart));
    console.log(parsedMachineLocalCart);
    setParsedMachineLocalCart(filteredCart);
  }
  
  // let machineLocalCart = window.localStorage.getItem("localCart");
  // console.log(JSON.parse(machineLocalCart));


  return (
    <div>
      <h2>Cart Items</h2>
      {parsedMachineLocalCart && parsedMachineLocalCart?.map((item, index) => (
        <div key={item?.id}>
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
      <h2>Cart Sub Total: ${subTotalPrice? subTotalPrice.toFixed(2):0}</h2>
      <h2>Cart Total with Shipping + Tax: ${totalPrice? totalPrice.toFixed(2):0}</h2>
    </div>
  );
}

export default Cart;
