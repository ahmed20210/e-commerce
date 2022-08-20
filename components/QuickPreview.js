import React, { useState } from "react";
import Image from "next/image";
import Rating from "./Rating";
import { AiOutlineHeart } from "react-icons/ai";
import home from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, changeCart } from "../store/cart";
import { addWhiteList } from "../store/whitelist";
import { removeActive } from "../store/quk";
function QuickPreview() {
    const dispatch = useDispatch();
  const [Qty, changeQty] = useState(1);
  const product = useSelector((state) => state.quk.quk);

  return (
    <div className={`w-screen h-screen flex justify-center items-center z-50 bg-secondary fixed`}>
      <div className="bg-white w-11/12 md:w-10/12 h-11/12 md:h-5/6 max-h-screen rounded-sm opacity-100 flex md:flex-row flex-col justify-center py-10 overflow-hidden relative">
        <div className=" md:w-5/12 mx-5 flex justify-center items-center rounded-md border-1">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={250}
          />
        </div>
        <div className="w-11/12 md:w-5/12 mx-5 flex items-start flex-col justify-star">
          <h2 className="text-3xl font-">{product.name}</h2>
          <Rating product={product} />
          <p className="text-primary text-2xl font-bold">${product.price}.00</p>
          <div className="flex items-center bg-slate-300 rounded-md px-2 my-5">
            <span className=" py-2">
              <label>Qty</label>
              <input
                onChange={(e) => changeQty(e.target.value)}
                className="w-8 mx-3 px-1 rounded-md"
                placeholder="1"
              />
            </span>
            
            <span
              onClick={() => {
                if (Qty > 1) {
                 dispatch(addToCart(product._id));
                 dispatch(changeCart({ id: product._id, quantity: Qty }));
                } else {
                  dispatch(addToCart(product._id));
                }
              }}
              className="px-5 py-2 font-semibold cursor-pointer bg-primary rounded-md text-white mx-3"
            >
              ADD TO CART
            </span>
            <span onClick={()=> dispatch(addWhiteList(product._id))} className={home.iconItem}>
              <AiOutlineHeart />
            </span>
          </div>
          <p className="text-slate-700 leading-7 max-w-max">
            {product.description.slice(0, 300)}
          </p>
        </div>
        <button onClick={()=> dispatch(removeActive())}
         className=" text-slate-500 my-2 mx-3 text-xl right-0 absolute top-0 ">
          X
        </button>
      </div>
    </div>
  );
}

export default QuickPreview;
