import { useParams } from "react-router-dom";
import { useEstoreListItemQuery } from "../redux/api";

function EstoreItem({ token }) {
  let { id } = useParams();

  const { data, error, isLoading } = useEstoreListItemQuery({ token, id });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!!!</p>;
  }

  return (
    <section>
      <h2>Item Description</h2>
      <h2>Item Name: {data.title}</h2>
      <h1>Price: ${data.price}</h1>
      <p>Category: {data.category}</p>
      <img src={data.image} alt={data.title} />
      <p>
        Rating: {data.rating.rate} ({data.rating.count} reviews)
      </p>
      <h3>{data.description}</h3>
    </section>
  );
}

export default EstoreItem;
