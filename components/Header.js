import React from "react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../store/products";
import { useSelector } from "react-redux";
import { fetchUserCart } from "../store/cart";
import Link from "next/link";
function Header({ categories }) {
  const [option, setOption] = React.useState(`0`);
  const [search, setSearch] = React.useState(``);
  const dispatch = useDispatch();
  const logedin = useSelector((state) => state.user.logedin);
  const userCart = useSelector((state) => state.cart.userCart);

  return (
    <div>
      <div>
        <ul>
          <li>email</li>
          <li>call us</li>
        </ul>
        <ul>
          <li>my account</li>
        </ul>
      </div>
      <nav>
        <span>logo</span>
        <form>
          <select onChange={(e) => setOption(e.target.value)}>
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
            placeholder="Search Products"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              e.preventDefault();
              dispatch(searchProducts({ option, search }));
            }}
          >
            Search
          </button>
        </form>
        <Link href={logedin === true? "/cart": "/login"}>
        cart
        </Link>
      </nav>
    </div>
  );
}

export default Header;
