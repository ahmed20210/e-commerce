import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Oauth } from "../store/user";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://fake-e-commerce-api.onrender.com/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data === "logged in") {
        dispatch(Oauth());
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      }

    } catch (err) {
      const error = err.response.data;
     setErr(error);
      setShow2(true);
      setTimeout(() => {
        setShow2(false);
      }
      , 2000);  
    }
  };

  return (
    <div className="my-5">
      <div className="flex items-center flex-col justify-center relative">
        {show ? (
          <div className="h-screen w-screen fixed flex justify-center">
            <div className="my-10 bg-green-100 h-40 text-center flex flex-col justify-center gap-10 items-center rounded-md py-5 px-10">
              <span>Successfully Logedin</span>
              <span onClick={() => setShow(false)} className="text-primary ">
                <FaCheckCircle className="w-8 h-8" />
              </span>
            </div>
          </div>
        ) : null}

        <form className="border p-5 m-5 w-11/12 sm:w-9/12 lg:w-4/12 rounded-md flex flex-col justify-center gap-5 items-center">
          <h1 className="text-3xl text-center bg-primary w-full text-white rounded-md py-1">
            Login
          </h1>
          <table>
            <tbody>
              <tr className="h-12">
                <th>
                  <label>Email:</label>
                </th>
                <td>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:outline-none border border-gray-300 rounded-md px-2 mx-5 "
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label className="">Password:</label>
                </th>
                <td>
                  <input
                    className="focus:outline-none border border-gray-300 rounded-md px-2 mx-5 "
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input
            className="bg-primary px-2 text-white rounded-md"
            onClick={(e) => {
              e.preventDefault();
              login(email, password);
            }}
            type="submit"
            value="Submit"
          />
          <Link href="/signup">
            <a className="text-blue-600">Create Account</a>
          </Link>
        </form>
        {show2 ? (
          <div className="w-9/12 bg-red-200 rounded-md text-red-800 p-3">
            {err}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
