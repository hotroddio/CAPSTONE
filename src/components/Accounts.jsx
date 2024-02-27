import { useAccountQuery } from "../redux/api";

function Accounts(props) {
  const { data, error, isLoading } = useAccountQuery(props.token);

  console.log("DATA from API", data);
  console.log("Error from API", error);
  console.log("isLoading", isLoading);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  

  if (error || !data?.username) {
    return <p>Something went wrong!!!</p>
  }

  
  return (
    <section>
      <h2>Account</h2>
      <ul>
        <h3>User Information</h3>
        {data?.username ? (<li>Username:{data?.username}</li>) : ""}
        {data?.email ? (<li>Email:{data?.email}</li>) : ""}
        {data?.password ? (<li>Password:{data?.password}</li>) : ""}
        {data?.phone ? (<li>Phone:{data?.phone}</li>) : ""}
        <h3>User Name</h3>
        {data?.name?.firstname ? (<li>First Name:{data?.name.firstname}</li>) : ""}
        {data?.name?.lastname ? (<li>Last Name:{data?.name.lastname}</li>) : ""}
        <h3>Address</h3>
        {data?.address?.street ? (<li>Street:{data?.address.street}</li>) : ""}
        {data?.address?.number ? (<li>Number:{data?.address.number}</li>) : ""}
        {data?.address?.city ? (<li>City:{data?.address.city}</li>) : ""}
        {data?.address?.zipcode ? (<li>Zipcode:{data?.address.zipcode}</li>) : ""}
        <h3>Geo-Location (if Available)</h3>
        {data?.address?.geolocation?.lat ? (<li>Geo-Location(Lat):{data?.address.geolocation.lat}</li>) : ""}
        {data?.address?.geolocation?.long ? (<li>Geo-Location(Long):{data?.address.geolocation.long}</li>) : ""}
      </ul>
    </section>
  );
}

export default Accounts;
