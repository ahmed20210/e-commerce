import React from 'react'
import { RiStarSFill } from 'react-icons/ri';
import { MdStarBorder } from 'react-icons/md';
function Rating({product}) {
  
  return (
    <div className="flex justify-center my-3 text-yellow-400">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>
          {i > product.rate.rating ? <MdStarBorder /> : <RiStarSFill />}
        </span>
      ))}
    </div>
  );
}

export default Rating