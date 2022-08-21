import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
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
        <div className="flex justify-evenly items-center flex-col lg:flex-row">
          <table className="sm:w-full md:w-11/12 lg:w-8/12  mx-5">
            <thead className="hidden sm:contents">
              <tr>
                <th></th>
                <th></th>
                <th className=" text-start">Product</th>
                <th className=" text-start">Price</th>
                <th className=" text-start">Subtotal</th>
                <th className=" text-start">Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y ">
              {cart.cartItems.products.map((item) => (
                <tr key={item.id}
                className="flex flex-col justify-center items-center p-5 gap-5 sm:table-row"
                >
                  <td>
                    <button
                    className="mx-5"
                      onClick={() => {
                        dispatch(removeFromCart(item.product._id));
                      }}
                    >
                      x
                    </button>
                  </td>
                  <td>
                    <Image
                      src={item.product.image}
                      width={50}
                      height={50}
                      alt={item.product.name}
                    />
                  </td>
                  <td>
                    <Link href={`/product/${item.product.id}`}>
                      <a>{item.product.name}</a>
                    </Link>
                  </td>
                  <td className="">${item.product.price}.00</td>
                  <td>${item.price}.00</td>
                  <td>
                    <input
                      type=""
                      className="w-9 focus:outline-none border px-2 py-1 mr-2 rounded-md"
                      placeholder={item.quantity}
                    />
                  
                    <input
                      className=" text-white bg-cyan-400  px-1 font-bold rounded-md"
                      onClick={(e) => {
                        e.preventDefault();
                        const val = parseInt(
                          e.target.parentElement.children[0].value
                        );
                        val > 0 || val.toString() != "NaN"
                          ? dispatch(
                              changeCart({
                                id: item.product._id,
                                quantity: val,
                              })
                            )
                          : null;
                      }}
                      type="submit"
                      value={"update cart"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-11/12 md:8/12 lg:w-4/12 text-gray-700 border p-3 rounded-md">
            <div className=" mb-3">Cart Totals</div>
            <table className="w-full py-5 border-t ">
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
                  <div className="flex justify-around flex-col items-center gap-3 sm:flex-row">
                    <Link href="/checkout">
                      <span className="bg-green-500 hover:bg-green-700 text-white font-bold px-3 py-2 rounded-full">
                        Checkout
                      </span>
                    </Link>
                  
                  
                    <span
                      onClick={() => dispatch(clearCart())}
                      className=" whitespace-nowrap bg-red-500 text-white font-semibold py-2 px-3 rounded-full"
                    >
                      Clear Cart
                    </span>
                  </div>
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
