import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../store/cart";
import checkout from "../styles/checkout.module.css";
import axios from "axios";
function Checkout() {
  const dispatch = useDispatch();
  const fetchOrder = () => {
    axios.get("https://e-commerce-backend-2022.herokuapp.com/orders",{
      withCredentials: true
    }).then(res => {console.log(res.data)})
  }

  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [payment, setPayment] = React.useState("");
  const [err1, setErr1] = React.useState("hidden");
  const [err2, setErr2] = React.useState("hidden");
  const [err3, setErr3] = React.useState("hidden");
  const [err4, setErr4] = React.useState("hidden"); 
 const [err5, setErr5] = React.useState("hidden"); 

  const completeOrder = () => {
  if (country.length<3 || city.length<3 || street.length<10 || phone.length<5 || payment == "") {
   setErr5("");
   setTimeout(() => {
    setErr5("hidden");
   }, 3000);
  }
else {
  axios.post("https://e-commerce-backend-2022.herokuapp.com/orders", {
 to: `${country}${city}${street}`,
  phone: phone,
  payment: payment,
  notes: notes,

  },{
    withCredentials: true
  }
  ).then(res => {
    console.log(res);
    fetchUserCart();
    setErr5("hidden");
  }
  )
}


  }
  useEffect(() => {
    cart.loading ? dispatch(fetchUserCart()) : null;
    fetchOrder();
  });
  return cart.loading ? (
    <div>Loading...</div>
  ) : (
    cart.cartItems.products.length > 0 ? (
    <div className="text-gray-800 relative">
<p className={`bg-red-200 w-72 rounded-3xl text-center fixed top-4 right-1/2 py-1 ${err5}` }><span className="mr-3 bg-white px-2 pb-1 rounded-full  text-red-700">x</span>pls complete Your info frist</p>
      <h2 className="font-bold text-4xl text-center my-14 j">CHECKOUT</h2>
      <div className="flex justify-evenly gap-5 items-center md:items-start flex-col md:flex-row">
        <div className=" w-11/12 sm:w-10/12 md:w-2/5 lg:w-5/12">
          <p className="my-5 text-3xl font-bolds pb-3 border-b">
            Billing Details
          </p>
          <form className="flex flex-col max-w-md gap-3 font-bold text-lg">
            <label>country:</label>
            <input
              onChange={(e) => {
                e.target.value.length < 3 ? setErr1("") : setErr1("hidden");
                setCountry(e.target.value);
              }}
              className="border focus:outline-none focus:border-primary rounded-3xl px-3"
              type="text"
              name="country"
            />
            <p
              className={`${err1} bg-red-200 rounded-2xl px-3 py-1 font-medium`}
            >
              <span className="bg-white px-2 pb-1 mr-3 text-red-700  rounded-full">
                x
              </span>
              you must at least 3 letters
            </p>

            <label>city:</label>
            <input
              onChange={(e) => {
                e.target.value.length < 3 ? setErr2("") : setErr2("hidden");
                setCity(e.target.value);
              }}
              className="border focus:outline-none focus:border-primary rounded-3xl px-3"
              type="text"
              name="city"
            />
            <p
              className={`${err2} bg-red-200 rounded-2xl px-3 py-1 font-medium`}
            >
              <span className="bg-white px-2 pb-1 mr-3 text-red-700  rounded-full">
                x
              </span>
              you must at least 3 letters
            </p>

            <label>street:</label>
            <input
              onChange={(e) => {
                e.target.value.length < 10 ? setErr3("") : setErr3("hidden");
                setStreet(e.target.value);
              }}
              className="border focus:outline-none focus:border-primary rounded-3xl px-3"
              type="text"
              name="street"
            />
            <p
              className={`${err3} bg-red-200 rounded-2xl px-3 py-1 font-medium`}
            >
              <span className="bg-white px-2 pb-1 mr-3 text-red-700  rounded-full">
                x
              </span>
              you must at least 10 letters
            </p>

            <label>phone:</label>
            <input
              onChange={(e) => {
                const phone = parseInt(e.target.value);
                phone.toString() == "NaN" || e.target.value.length < 5
                  ? setErr4("")
                  : setErr4("hidden");
                setPhone(parseInt(e.target.value));
              }}
              className="border focus:outline-none focus:border-primary rounded-3xl px-3"
              type="text"
              name="phone"
            />
            <p
              className={`${err4} bg-red-200 rounded-2xl px-3 py-1 font-medium`}
            >
              <span className="bg-white px-2 pb-1 mr-3 text-red-700  rounded-full">
                x
              </span>
              you must at least 5 numbers
            </p>

            <div className="flex flex-col ">
              <label>Notes:</label>
              <textarea
                onChange={(e) => setNotes(e.target.value)}
                className="border focus:outline-none focus:border-primary rounded-md px-3"
                type="text"
                name="phone"
              />
            </div>
          </form>
        </div>
        <div className="w-11/12 sm:w-10/12 rounded-lg md:w-7/12 lg:w-6/12 bg-neutral-200 p-3">
          <p className=" text-3xl pb-3 border-b-2 max-w-xs border-primary">
            Your Order
          </p>

          <table className="w-full border-separate border-spacing-2 border-b my-3 border-gray-500">
            <thead className="">
              <tr className="border-b-2 border-gray-500 h-10">
                <th className="text-start">Product</th>
                <th className="text-start">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems.products.map((item) => (
                <tr key={item.id} className="">
                  <td>
                    <span>{item.product.name} </span>
                    <span className="font-bold">X{item.quantity}</span>
                  </td>
                  <td className="font-semibold">${item.price}.00</td>
                </tr>
              ))}
              <tr className="h-16">
                <td className="font-semibold">SubTotal</td>
                <td className="font-semibold">${cart.cartItems.total}.00</td>
              </tr>
              <tr className="h-14">
                <td className="font-semibold">Shipping</td>
                <td className="font-semibold">$50.00</td>
              </tr>
              <tr className="">
                <td className="font-semibold">Total</td>
                <td className="font-semibold">
                  ${cart.cartItems.total + 50}.00
                </td>
              </tr>
              <tr>
                <div>
                  <p className="text-xl font-bold">payment</p>
                  <div className="my-3 font-semibold">
                    <input
                      className="mr-3"
                      onChange={(e) => setPayment(e.target.value)}
                      type="radio"
                      name="payment"
                      value="Cash On Delivery"
                    />
                    <label htmlFor="Cash On Delivery">Cash On Delivery</label>
                  </div>
                </div>
              </tr>
              <tr>
                <div className="py-2 my-2 font-semibold">
                  <button 
                  onClick={()=>completeOrder()}
                   className="sm:text-xl text-sm fonst-bold bg-primary py-2 px-5 rounded-3xl text-white">
                    Place Order
                  </button>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>):<div className="flex justify-center items-center h-screen text-xl">Your Cart is empty <br/>
    no order to checkout </div>
  );
}

export default Checkout;
