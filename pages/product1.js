import React from 'react'
import Image from 'next/image';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import Rating from '../components/Rating';
import home from "../styles/Home.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart";
import { addWhiteList } from "../store/whitelist";
import {setquk} from '../store/quk'
function Product({ product }) {
    const dispatch = useDispatch();

  return (
    product ? (
    <>
    <div className=''>
    </div>
      <div
        className={`text-center h-96 pt-5  mb-3 border hover:shadow-lg flex flex-col justify-between rounded-3xl bg-yellow-50 ${home.iconList}`}
      >
        <div className="relative overflow-y-hidden">
          <Image
            src={product.image}
            width={200}
            height={200}
            alt={product.name}
          />
          <div className="flex justify-center">
            <div className={`flex justify-center absolute z-20 ${home.show}`}>
              <span
                onClick={() => dispatch(addToCart(product._id))}
                className={home.iconItem}
              >
                <FaShoppingCart />
              </span>
              <span
                onClick={() => {
                  dispatch(addWhiteList(product._id));
                }}
                className={home.iconItem}
              >
                <AiOutlineHeart />
              </span>

              <span
                onClick={() => {
                  console.log("first")
                dispatch(setquk(product));
                
                }}
                className={home.iconItem}
              >
                <BsSearch />
              </span>
            </div>
          </div>
        </div>
        <Rating product={product} />
        <h2 className="text-slate-800">{product.name} </h2>
        <div className="flex items-center justify-center border-t bg-cyan-100 rounded-br-3xl rounded-bl-3xl">
          <p className={`text-primary font-bold text-xl my-3`}>
            ${product.price}.00
          </p>
          <span className={`flex justify-center text-primary mx-2`}>
            <Link href={`/product/${product._id}`}>
              <a>
                <IoIosArrowDroprightCircle className="w-8 h-8" />
              </a>
            </Link>
          </span>
        </div>
      </div>
    </>
    ) : null
  );
}

export default Product