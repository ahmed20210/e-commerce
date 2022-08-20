import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Image from 'next/image'
import {fetchWhiteList, removeWhiteList} from '../store/whitelist'
function Whitelist() {

const dispatch = useDispatch()
const wishlist = useSelector((state) => state.whiteList.WList);
  useEffect(() => {
    dispatch(fetchWhiteList());
  }, []);
  return (
    <div className='text-gray-800'>
      <h1 className='text-3xl text-center my-5 font-bold'>Whitelist</h1>
      <div className='flex justify-center'>
        <table className="w-full mx-2 text-sm sm:text-lg sm:w-11/12">
          <thead className=''>
            <tr>
              <th></th>
              <th></th>
              <th className="text-start">product name</th>
              <th className="text-start">product price</th>
            </tr>
          </thead>
          <tbody className='divide-y '>
            {wishlist.map((product) => (
              <tr className='my-5'
               key={product._id}>
                <td>
                  <button onClick={()=>{
                    dispatch(removeWhiteList(product._id))
                  }}>x</button>
                </td>
                <td>
                  <Image
                    src={product.image}
                    width={50}
                    height={50}
                    alt={product.name}
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Whitelist