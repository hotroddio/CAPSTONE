import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//api
import { useLoginMutation, useGetUserIdQuery } from "../redux/api";

function Login(props) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const [errorMsg, setError] = useState(null);
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const eventHandler = async (event) => {
    event.preventDefault();
    const { data, error } = await login(userInfo);

    if (error) {
      setError(error.data);
      console.log(`in event handler`, error);
    } else {
      props.setToken(data.token);
      //TODO: change to EstoreList later
      // navigate(`/account/${props.userId}`);
      navigate(`/estore`);
      console.log(`in event handler ${JSON.stringify(data)}`);
    }
  };

  const onUserInput = (e) => {
    if (errorMsg) {
      setError(null);
    }
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const { data, error, isLoading } = useGetUserIdQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!!!</p>;
  }
  

if (data) { 
  const user = data.find((user) => user.username === userInfo.username && userInfo.password === user.password)
  props.setUserId(user?.id);
}

  return (
    <div>
      <h2>LOGIN</h2>
      {errorMsg ? <p>{errorMsg}</p> : <span />}
      <form onSubmit={eventHandler}>
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
          Password m38rmF$
          <input
            type="password"
            placeholder="password"
            value={userInfo.password}
            name="password"
            onChange={onUserInput}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
