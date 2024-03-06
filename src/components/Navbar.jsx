import { NavLink, useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();
  const logoutUser = () => {
    props.setToken(null);
    props.setUserId(null);
    // Below statement navigates us back to the homepage after logout
    navigate("/");
  };
  // if statement takes us to the logged in pages and else takes us to the not logged in pages. Thats why we have props.token in "if".
  if (props.token) {
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/estore">E-Store</NavLink>
        <NavLink to={`/cart/${props.userId}`}>Cart</NavLink>
        <NavLink to={`/account/${props.userId}`}>Account</NavLink>
        <a onClick={logoutUser}>Logout</a>
      </nav>
    );
  }
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/estore">E-Store</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
}
export default NavBar;
