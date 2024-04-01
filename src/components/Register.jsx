import { useState } from "react";
import { useRegisterMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";

function Register(props) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });

  const [address, setAddress] = useState({
    city: "",
    street: "",
    number: "",
    zipcode: "",
  });

  const [errorMsg, setError] = useState(null);
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const requiredFields = [
    userInfo.email,
    userInfo.username,
    userInfo.password,
    name.firstname,
    name.lastname,
    address.city,
    address.street,
    address.number,
    address.zipcode,
    userInfo.phone,
  ];

  const eventHandler = async (event) => {
    event.preventDefault();

    if (requiredFields.some((field) => !field)) {
      window.alert("Please fill in all required fields.");
      return; 
    }
    
    const { data, error } = await register({ userInfo, name, address });

    if (error) {
      setError(errorMsg);
      console.log(`in event handler ${JSON.stringify(error)}`);
    } else {
      props.setToken(data);
      navigate("/");
      console.log(`in event handler ${JSON.stringify(data)}`);
    }

    setError(null);
  };

  const onUserInput = (e) => {
    if (errorMsg) {
      setError(null);
    }
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onNameInput = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };

  const onAddressInput = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMsg ? <p>{errorMsg}</p> : null}
      <form onSubmit={eventHandler}>
        <label>
          E-mail
          <input
            type="email"
            placeholder="email"
            value={userInfo.email}
            name="email"
            onChange={onUserInput}
          />
        </label>
        <label>
          Username
          <input
            type="username"
            placeholder="username"
            value={userInfo.username}
            name="username"
            onChange={onUserInput}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="password"
            value={userInfo.password}
            name="password"
            onChange={onUserInput}
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            placeholder="first name"
            value={name.firstname}
            name="firstname"
            onChange={onNameInput}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            placeholder="last name"
            value={name.lastname}
            name="lastname"
            onChange={onNameInput}
          />
        </label>
        <label>
          City
          <input
            type="text"
            placeholder="city"
            value={address.city}
            name="city"
            onChange={onAddressInput}
          />
        </label>
        <label>
          Street
          <input
            type="text"
            placeholder="street"
            value={address.street}
            name="street"
            onChange={onAddressInput}
          />
        </label>
        <label>
          Number
          <input
            type="text"
            placeholder="number"
            value={address.number}
            name="number"
            onChange={onAddressInput}

          />
        </label>
        <label>
          Zipcode
          <input
            type="text"
            placeholder="zipcode"
            value={address.zipcode}
            name="zipcode"
            onChange={onAddressInput}
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            placeholder="phone number"
            value={userInfo.phone}
            name="phone"
            onChange={onUserInput}
          />
        </label>
        <button className="submitBtn" disabled={requiredFields.some((field) => !field)}>Submit</button>
      </form>
    </div>
  );
}

export default Register;
