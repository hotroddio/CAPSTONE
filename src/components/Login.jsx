import { useState } from "react";
import { useNavigate } from "react-router-dom";
//api
import {useLoginMutation} from "../redux/api";


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
          console.log(`in event handler` , error);
        } else {    
          props.setToken(data.token);
          //TODO: change to EstoreList later
          navigate("/account");
          console.log(`in event handler ${JSON.stringify(data)}`);
        }
      };

      const onUserInput = (e) => {
        if (errorMsg) {
          setError(null);
        }
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
      };

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
              Password
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