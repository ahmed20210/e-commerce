import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
function Orders() {
const orderList = () => {
return axios.get ('https://fake-e-commerce-api.onrender.com/orders',{
    withCredentials: true
})
.then(res => {
   
   return res.data
})
}

const [orders, setOrders] = useState([])
const cancelOrder = (id) => {
    axios.delete(`https://fake-e-commerce-api.onrender.com/orders/${id}`
    ,{
        withCredentials: true
    })
    .then(res => {
        if (res.data === "Order Cancelled"){
            orderList().then(res => {
                setOrders(res)
            }
            )
        }
    }
    )
}


useEffect (() => {
   orderList().then(res => {
         setOrders(res.orders)
   }
    )
} , [])
  return (
     orders.length > 0 ? 
    <div className='mb-5'>
      <h1 className='text-3xl text-center font-bold my-5 rounded-md'>Orders</h1>


      <ul className="text-sm p-5 border mx-5">
        {orders.map((order, index) => (
          <li key={order._id}>
            <h3>Thank you. Your order has been received.</h3>
            <p>Order Number: {5547}</p>
            <p>Order Date: {order.date.slice(0, 10)}</p>
            <p>Order Total: {order.total}</p>
            <p>Payment method: {order.payment}</p>
            <p>Shipping Address: {order.to}</p>
            <div className="flex justify-center">
              <table className="w-11/12 md:w-8/12">
                <thead className="border-b">
                  <tr className="h-10">
                    <th className="text-start">Product</th>
                    <th className="text-start">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, index) => (
                    <tr
                      key={item.id}
                      className={
                        index === order.products.length - 1
                          ? `border-b h-8`
                          : "h-8"
                      }
                    >
                      <td>
                        <span>{item.product.name} </span>
                        <span className="font-bold">X{item.quantity}</span>
                      </td>
                      <td className="font-semibold">${item.price}.00</td>
                    </tr>
                  ))}
                  <tr className="h-10 border-b">
                    <td className="font-semibold">SubTotal</td>
                    <td className="font-semibold">${order.total}.00</td>
                  </tr>
                  <tr className="h-10 border-b">
                    <td className="font-semibold">Shipping</td>
                    <td className="font-semibold">$50.00</td>
                  </tr>
                  <tr className="h-10 border-b">
                    <td className="font-semibold">Total</td>
                    <td className="font-semibold">${order.total + 50}.00</td>
                  </tr>
                  <tr>
                    <th className="text-xl font-bold">payment</th>
                    <td className="">{order.payment}</td>
                  </tr>
                  <tr>
                    <div className="py-2 my-2 font-semibold">
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="sm:text-xl text-sm fonst-bold bg-primary py-2 px-5 rounded-3xl text-white"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
        ))}
      </ul>
    </div>: <div className=' justify-center h-screen flex items-center'>No Orders</div>
  );
}

export default Orders