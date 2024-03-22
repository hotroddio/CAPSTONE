import { useEstoreListQuery } from "../redux/api";
import { Link, useParams } from "react-router-dom";
import addCartItems from "../components/utilitiesCart";
import { useState } from "react";
// import { addToCart } from "../redux/api";
import "./styles/EstoreList.css"
import { cartActions } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

// function EstoreList(props) {
function EstoreList({ token, products }) {
  let { id } = useParams();
  // const { data, error, isLoading } = useEstoreListQuery(props.token);
  const { data, error, isLoading } = useEstoreListQuery(token);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  
  
  const onAddToCart = (e) => {
    e.preventDefault();
  

  const action = e.nativeEvent.submitter.name;

  switch (action.type) {
    case cartActions.addToCart.type:
      const newItem = action.payload;
      break;
  }
}
  // const [ cartItems, setCartItems] = useState([]);

  // console.log("Price data", data?.[0]?.title);


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!!!</p>;
  }

  // setProducts(data);

  

  // const eventHandler = async (event) => {
  //   event.preventDefault();
  //   addCartItems();
  //   console.log(addCartItems(data));
  // };


  // The below section allows me to search dynamically through titles
  let filteredData = selectedCategory === "All"
  ? data
  : data.filter(item => item.category === selectedCategory);

  filteredData = searchTerm
    ? filteredData.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : filteredData;

  

  // console.log(filteredData);
  
  // The below allows me to add items to the cart
  const handleAddToCart = (item) => {
    console.log("Adding item to cart:", item);
  dispatch(cartActions.addToCart(item));
  };


  return (
    <div >
      <div>
      <h2>E-Store List</h2>
      <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
        <option value="All">All Items</option>
        <option value="mens' clothing">Men's Clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
          <input
            type="text"
            placeholder="Search.."
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
          <div className="entireList">
      {filteredData.map (item => (
          <div className="estoreListItems" key={item.id}>
            <h5>Item Name: {item.title}</h5>
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
      ))}
      </div>
    </div>
  );
}

export default EstoreList;
