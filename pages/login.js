import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Oauth } from "../store/user";
import axios from "axios";
import Header from "../components/Header";
function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const logedin = useSelector((state) => state.user.logedin);
  console.log(logedin);
  const login = async (email, password) => {
  const res = await axios.post(
    "https://e-commerce-backend-2022.herokuapp.com/login",
    {
      email,
      password,
    },
    {
        withCredentials: true,
    }
  );
   
      
  };
  const singOut =async () => {
    axios
      .get("https://e-commerce-backend-2022.herokuapp.com/logout")
      
  };
  const singUp = async (name, email, password) => {
    axios.post("https://e-commerce-backend-2022.herokuapp.com/signup",{
        name,
        email,
        password
    })
  }
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
          />
        </label>
        <label>
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </label>
        <input
          onClick={(e) => {
            e.preventDefault();
            login(email, password);
            dispatch(Oauth());

          }}
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

export default Login;
