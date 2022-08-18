import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../store/products";
import { useSelector } from "react-redux";
import { setCategories } from "../store/products";
import { Oauth } from "../store/user";
import {
  BsWhatsapp,
  BsSearch,
  BsFillBagFill,
  BsHeartFill,
} from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png";
import axios from "axios";

function Header() {
  const [option, setOption] = React.useState(`0`);
  const [search, setSearch] = React.useState(``);
  const dispatch = useDispatch();
  const logedin = useSelector((state) => state.user.logedin);
  const [pos, setPos] = React.useState("-left-64");
  const cart = useSelector((state) => state.cart);
  const categories = useSelector((state) => state.products.categories);
  const logout = async () => {
    const res = await axios.get(
      "https://e-commerce-backend-2022.herokuapp.com/logout",
      {
        withCredentials: true,
      }
    );
    if (res.data === "logged out") {
      dispatch(Oauth());
    }
  };
  useEffect(() => {
    dispatch(setCategories());
    dispatch(Oauth());
  }, [logedin]);

  return (
    <div>
      <div className="flex justify-between items-center my-1">
        <ul className="md:flex hidden justify-between gap-5 ">
          <li>
            <BsWhatsapp className="inline mx-2 text-primary" /> whatsapp:
            <span className="font-bold">+201144781238</span>
          </li>
        </ul>
        <div className="flex gap-2 items-center justify-between text-xs sm:text-lg">
          <Link href={logedin === true ? "/orders" : "/login"}>
            <a>
              <TbTruckDelivery className="inline mr-2 w-5 h-5 " />
              Track Your Order
            </a>
          </Link>
          <div>
            <Link href="/signup">
              <a className="bg-primary py-1 px-2 text-white m-1 rounded-md">
                SIGN UP
              </a>
            </Link>

            {logedin ? (
              <span
                onClick={() => logout()}
                className="bg-primary py-1 px-2 text-white m-1 rounded-md"
              >
                LOGOUT
              </span>
            ) : (
              <Link href="/login">
                <a className="bg-primary py-1 px-2 text-white m-1 rounded-md">
                  LOGIN
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
      <nav className="md:px-8 flex h-1 justify-between  items-center my-1 bg-gray-200 py-7">
        <span>
          <Image src={logo} width="100" height="100" layout="fixed" alt="logo" />
        </span>
        <form className="md:flex hidden">
          <select
            className="px-4 py-2 rounded-md mx-2 focus:outline-none"
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="0">All Categories</option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
          <input
            className="focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-2 px-4 appearance-none leading-normal"
            placeholder="Search Products"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(searchProducts({ option, search }));
            }}
          >
            <Link href="/search">
              <a>
                <BsSearch className="inline mx-2 " />
              </a>
            </Link>
          </button>
        </form>
        <div className="flex justify-between gap-3 md:gap-5 md:mx-3">
          <Link href={logedin === true ? "/cart" : "/login"}>
            <span className="py-3 cursor-pointer rounded-md text-yellow-600 px-4 bg-white relative">
              <a>
                <BsFillBagFill />
              </a>
              <span className="absolute text-xs text-white font-semibold px-1 py-0.5 rounded-lg top-2 -left-2 bg-red-500">
                {cart.cartlength}
              </span>
            </span>
          </Link>
          <Link href={logedin === true ? "/whitelist" : "/login"}>
            <span className="py-3 rounded-md text-yellow-600 px-4 bg-white relative">
              <a>
                <BsHeartFill />
              </a>
            </span>
          </Link>
        </div>
        <div className="relative">
          <span
            onClick={() => {
              if (pos === "-left-64") {
                setPos("-left-0");
              } else {
                setPos("-left-64");
              }
            }}
          >
            <TiThMenu className="w-10 h-7" />
          </span>
          <ul
            className={`flex font-medium flex-col justify-between fixed bg-white divide-y z-10 top-0 transition-all ${pos} px-10 py-5 h-screen max-h-screen w-64`}
          >
            <li
              onClick={() => {
                setPos("-left-64");
              }}
            >
              <Link href={`/`}>
                <a> Home</a>
              </Link>
            </li>
            {categories.map((category, index) => (
              <li
                onClick={() => {
                 setPos("-left-64");
                }}
                key={index}
                className=""
              >
                <Link href={`/categories/${category}`}>
                  <a>{category === "Home" ? "Furniture" : category}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <form className="flex justify-center bg-gray-200 mb-3 md:hidden">
        <select
          className="px-4 py-2 rounded-md mx-2 focus:outline-none hidden sm:block"
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="0">All Categories</option>
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <input
          className="w-8/12 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-2 px-4 leading-normal"
          placeholder="Search Products"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(searchProducts({ option, search }));
          }}
        >
          <BsSearch className="inline mx-2 " />
        </button>
      </form>
    </div>
  );
}

export default Header;
