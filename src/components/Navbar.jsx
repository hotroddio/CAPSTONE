import { NavLink, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function NavBar(props) {
  const navigate = useNavigate();
  const logoutUser = () => {
    props.setToken(null);
    props.setUserId(null);
    props.setLocalCart(null);
    // Below statement navigates us back to the homepage after logout
    navigate("/");
  };
  // if statement takes us to the logged in pages and else takes us to the not logged in pages. Thats why we have props.token in "if".
  if (props.token) {
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/estore">E-Store</NavLink>
        <NavLink to={`/account/${props.userId}`}>Account</NavLink>
        <a onClick={logoutUser}>Logout</a>
        <NavLink to={`/cart/${props.userId}`}><ShoppingCartIcon/></NavLink>
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
