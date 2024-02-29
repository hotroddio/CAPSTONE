import { useEstoreListQuery } from "../redux/api";
import { Link } from "react-router-dom";

function EstoreList(props) {
  const { data, error, isLoading } = useEstoreListQuery(props.token);

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

  // const details = () => {

  // }

  return (
    <div>
      <h2>E-Store List</h2>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <h2>Item Name: {item.title}</h2>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <img src={item.image} alt={item.title} />
            <p>
              Rating: {item.rating.rate} ({item.rating.count} reviews)
            </p>
            <Link to={`/estoreitem/${item.id}`}>More Information</Link>
          </div>
        );
      })}
    </div>
  );
}

export default EstoreList;
