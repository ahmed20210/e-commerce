import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import {
  fetchUserCart,
  removeFromCart,
  clearCart,
  changeCart,
} from "../store/cart";
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchUserCart());
  }, []);
  return cart.loading ? (
    <h1>Loading</h1>
  ) : cart.cartItems.products.length > 0 ? (
    <>
    <div className="my-5">
      <h2 className="text-3xl text-center my-7 text-gray-700">CART</h2>
      <div className="flex justify-evenly items-center md:items-start flex-col md:flex-row">
        <ul className="my-5 md:my-0 md:w-9/12 flex flex-wrap justify-evenly gap-4 text-gray-700">
          {cart.cartItems.products.map((item, index) => (
            <li
              key={index}
              className="border py-3 lg:w-3/13 sm:w-5/13 rounded-md flex gap-4 flex-col justify-center items-center"
            >
              <div className="">
                <Image
                  src={item.product.image}
                  className="border"
                  width={80}
                  height={80}
                  layout="fixed"
                  alt={item.product.name}
                />
              </div>
              <div className="text-sm">
                <span>{item.product.name}</span>
              </div>
              <div className="w-10/12">
                <div className="flex justify-between w-full">
                  <span> price:</span>
                  <span> ${item.product.price}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>subtotal: </span>
                  <span>${item.price}.00</span>
                </div>
              </div>

              <div className="mx-1">
                <button
                  onClick={() => {
                    dispatch(removeFromCart(item.product._id));
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 mx-2 rounded-full"
                >
                  <AiFillDelete />
                </button>
                <input
                  type=""
                  className="w-9 mx-2 focus:outline-none border px-2 py-1 rounded-md"
                  placeholder={item.quantity}
                />
                <input
                  className=" text-white bg-primary border px-2 py-1 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    const val = parseInt(
                      e.target.parentElement.children[0].value
                    );
                    val > 0 || val.toString() != "NaN" 
                      ? dispatch(
                          changeCart({ id: item.product._id, quantity: val })
                        )
                      : null;
                  }}
                  type="submit"
                  value={"update cart"}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="w-10/12   md:w-4/13 text-gray-700">
          <div className="text-2xl mb-3">Cart Totals</div>
          <table className="w-full py-5 text-lg md:text-sm border-t ">
            <tbody className="">
              <tr className="h-10">
                <th className="text-start">subtotal:</th>
                <td className="text-end">${cart.cartItems.total}.00</td>
              </tr>
              <tr className="h-10">
                <th className="text-start">Shipping:</th>
                <td className="text-end">$50.00</td>
              </tr>
              <tr className="border-t h-10">
                <th className="text-start">Total:</th>
                <td className="text-end">${cart.cartItems.total + 50}.00</td>
              </tr>
              <tr>
                <td>
                  <Link href="/checkout">
                    <span className="bg-green-500 hover:bg-green-700 text-white font-bold px-3 py-2 rounded-full">
                      Checkout
                    </span>
                  </Link>
                </td>
                <td>
                  <span
                    onClick={() => dispatch(clearCart())}
                    className=" whitespace-nowrap bg-red-500 text-white font-semibold py-2 px-3 rounded-full"
                  >
                    Clear Cart
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  ) : (
    <div className="flex justify-center items-center h-screen">
      Your Cart is Empty
    </div>
  );
}

export default Cart;
