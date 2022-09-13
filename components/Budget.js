import React from 'react'

function Budget({product}) {
  const newArrival = product.subcategory.filter((subcategory) => {
  if(subcategory === "New Arrival")
{  return subcategory}
      
    }
  )
  return (
    <ul className=" absolute top-0 left-0 m-2 z-40">
      {newArrival.length > 0 ? (
        <li className=" bg-primary text-white rounded-md w-8 py-1 font-mono italic text-xs">
          New
        </li>
      ) : null}
      {product.Sale.available ? (
        <li className="mt-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xs">
          <p> {product.Sale.value}% <br/> off</p>
          
        </li>
      ) : null}
    </ul>
  );
}

export default Budget