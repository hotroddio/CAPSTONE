import { useCartQuery } from "../redux/api";
import { useParams } from "react-router-dom";

function addCartItems({ token, products }) {
  let { id } = useParams();
  const { data, error, isLoading } = useCartQuery({ token, id });

  console.log("DATA from API", data);
  console.log("Error from API", error);
  console.log("isLoading", isLoading);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

  //   if (error) {
  //     return <p>Something went wrong!!!</p>;
  //   }

  let storedProductIds = data[0].products.map((product) => {
    return product.productId;
  });

  console.log(storedProductIds);
  console.log(products);

  // localStorage.setItem(cartId, {id: item.id, products:{...item, quantity}}
  //     )
}

export default addCartItems;

//need to figure out add to get addCartItems to export to Estore
