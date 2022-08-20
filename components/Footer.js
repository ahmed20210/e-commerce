import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from '../images/logo.png'
import {ImLocation} from 'react-icons/im'
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import {useSelector} from 'react-redux'
function Footer() {
    const logedin = useSelector(state => state.logedin)
  return (
    <div className=" bg-fuchsia-700 text-white rounded-tl-3xl rounded-tr-3xl">
      <div className="flex justify-around items-start flex-wrap pb-5 p-2">
        <div>
          <p className="font-bold text-lg my-3">My Account</p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href={logedin ? "/whitelist" : "/login"}>
                <a>My Whitelist</a>
              </Link>
            </li>
            <li>
              <Link href={logedin ? "/cart" : "/login"}>
                <a>My Cart</a>
              </Link>
            </li>
            <li>
              <Link href={logedin ? "/orders" : "/login"}>
                <a>My Orders</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </li>
            <li>
              <Link href={logedin ? "/checkout" : "/login"}>
                <a>Checkout</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-lg my-3">Our Services</p>
          <ul className="flex flex-col gap-2">
            <li>Orders History</li>
            <li>Site Map</li>
            <li>Returns And Exchanges</li>
            <li>Terms Of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-lg my-3">Contact US</p>
          <ul className="flex flex-col">
            <li className="">
              <Image src={logo} width={70} height={70} alt="logo" />
            </li>
            <li>
              <ImLocation className="inline text-yellow-500 mr-2" />
              Address:
              <span className="font-semibold"> Egypt,Al Gharbia,Tanta</span>
            </li>
            <li>
              <FaTelegramPlane className="inline text-blue-500 mr-2" /> Mail Me:
              <span className="font-semibold text-xs sm:text-lg"> Ahmdmsty345@gmail.com</span>
            </li>
            <li>
              <IoLogoWhatsapp className="inline text-green-500 mr-2" />
              phone:<span className="font-semibold"> +201144781238</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center bg-slate-900 text-xs sm:text-lg text-white py-1">
        Copyright © 2022 by SHARABASH.
        All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer
