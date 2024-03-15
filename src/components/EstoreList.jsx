import { useEstoreListQuery } from "../redux/api";
import { Link, useParams } from "react-router-dom";
import addCartItems from "../components/utilitiesCart";
import { useState } from "react";

// function EstoreList(props) {
function EstoreList({ token, products, setProducts, localCart, setLocalCart }) {
  let { id } = useParams();
  // const { data, error, isLoading } = useEstoreListQuery(props.token);
  const { data, error, isLoading } = useEstoreListQuery(token);
  const [searchTerm, setSearchTerm] = useState("");
  // const [ cartItems, setCartItems] = useState([]);

  console.log("DATA from API", data);
  console.log("Error from API", error);
  console.log("isLoading", isLoading);
  console.log("Price data", data?.[0]?.title);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!!!</p>;
  }

  // props.setProducts(data)
  setProducts(data);

  const eventHandler = async (event) => {
    event.preventDefault();
    addCartItems();
    console.log(addCartItems(data));
  };
  console.log(data?.[1].title);

  // The below section allows me to search dynamically through titles
  let filteredData = searchTerm
    ? data.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : data;

  console.log(filteredData);
  console.log(localCart);

  // The below allows me to add items to the cart
  const handleAddToCart = (item) => {
    let updatedCart = [...localCart];
    const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);
    console.log(updatedCart);
    console.log(existingItemIndex);
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({
        ...item
      });
    }
    console.log("----", updatedCart);
    setLocalCart(updatedCart);
    window.localStorage.setItem("localCart", JSON.stringify(updatedCart));

    // let newItem = {
    //   category: item.category,
    //   description: item.description,
    //   id: item.id,
    //   image: item.image,
    //   price: item.price,
    //   rating: {
    //     rate: item.rating.rate,
    //     count: item.rating.count,
    //   },
    //   title: item.title,
    //   quantity: 1,
    // };
    // setLocalCart([...localCart, newItem]);
    // window.localStorage.setItem("localCart", JSON.stringify(localCart));
    // console.log(newItem);
  };

  return (
    <div>
      <h2>E-Store List</h2>
      <form className="form-inline">
        <label htmlFor="search">
          <input
            type="text"
            placeholder="Search.."
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </form>
      {filteredData.map((item) => {
        return (
          <div key={item.id}>
            <h2>Item Name: {item.title}</h2>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Category: {item.category}</p>
            <img src={item.image} alt={item.title} />
            <p>
              Rating: {item.rating.rate} ({item.rating.count} reviews)
            </p>
            <Link to={`/estoreitem/${item.id}`}>More Information</Link>
            <button onClick={() => handleAddToCart(item)}>
              Add Item to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default EstoreList;
