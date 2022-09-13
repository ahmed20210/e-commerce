import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaShoppingCart} from 'react-icons/fa'
import {AiOutlineHeart} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import {IoIosArrowDroprightCircle} from 'react-icons/io'

import Image from 'next/image';
import  Rating  from '../components/Rating';
import Link from 'next/link';
import home from '../styles/Home.module.css'
function Search() {
    const dispatch = useDispatch()
    const list = useSelector((state) => state.products.searchList)
  return (
    <div className=' min-h-screen'>
      {
        list.length > 0 ?
      
        <ul className='flex flex-wrap justify-around gap-3 my-5'>
            {list.map((product, index) => 
             <li
                  key={index}
                  className={` text-center border-1 p-5 hover:border-2 hover:border-primary rounded-md ${home.iconList}`}
                >
                  <div className="h-52 relative overflow-y-hidden">
                    <Image
                      src={product.image}
                      className="max-h-full"
                      width={200}
                      height={200}
                      alt={product.name}
                    />
                    <div className="flex justify-center">
                      <div
                        className={`flex justify-center w-32 absolute z-20 ${home.show}`}
                      >
                        <span
                          onClick={() => dispatch(addToCart(product._id))}
                          className={home.iconItem}
                        >
                          <FaShoppingCart />
                        </span>
                        <span
                          onClick={() => dispatch(addWhiteList(product._id))}
                          className={home.iconItem}
                        >
                          <AiOutlineHeart />
                        </span>

                        <span
                          onClick={() => {
                            setQuk(product);
                            setActive(true);
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
                  <p className="text-primary font-bold text-xl my-3">
                    ${product.price}.00{" "}
                  </p>
                  <span className="flex justify-center text-primary">
                    <Link href={`/product/${product._id}`}>
                      <IoIosArrowDroprightCircle className="w-8 h-8" />
                    </Link>
                  </span>
                </li>
            )}
        </ul>
:
<div className="flex justify-center items-center h-screen">
  No Result Found
  </div>
      }
    </div>
  )
}

export default Search