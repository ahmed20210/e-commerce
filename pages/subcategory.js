import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from "react-redux"

function Subcategory({subcategory, setList}) {
const categories = useSelector((state) => state.products.categories);
const [activ, setActiv] = useState("")
const [bestSell, setBestSell] = useState(false)
  const categoriesList = (products, cat) => {
    if (cat === "all") {
      return products;
    } else {
      return products.filter((product) => {
        return product.category === cat;
      });
    }
  };
const addActive = (e) => {
  const current = e.target;
  current.parentElement.childNodes.forEach((item) => {
    item.classList.remove("text-primary");
  });
  current.classList.add("text-primary");
};
const watchWindow = () => {
    if (window.innerWidth < 1024 && window.innerWidth> 425) {
      setActiv("select");
    } else if (window.innerWidth > 1024) {
      setActiv("list");
    } else if (window.innerWidth < 425) {
      setActiv("none");
    }
}
  const makegrid = (p) => {
    let grid = [];
    for (let i = 0; i < p.length; i += 2) {
      const t = p.slice(i, i + 2);

      grid.push(t);
    }
    return grid;
  };


useEffect(() => {
    watchWindow();
    window.addEventListener("resize", watchWindow);
   
if (
  subcategory[0].subcategory[0] === "Best Seller" ||
  subcategory[0].subcategory[0] === "Top Rated"
) { 
  setList(makegrid(subcategory));
  setBestSell(true);
}
    return () => {
        window.removeEventListener("resize", watchWindow);
    }

}
, []);
if (subcategory){
if (activ === "list" && !bestSell) {
  return (

        
      <ul className={` border-1 rounded-md divide-x flex`}>
        <li
          className={`px-3 my-3 hover:text-primary text-primary w-2/12`}
          onClick={(e) => {
            addActive(e);
            setList(subcategory, "all");
          }}
        >
          All
        </li>
        {categories.slice(1, 7).map((item, index) => (
          <li
            className={`px-3  my-3 hover:text-primary`}
            onClick={(e) => {
              addActive(e);
              setList(categoriesList(subcategory, item));
            }}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
          
  )
        } else if (activ === "select"&& !bestSell) {
            return (
      <select
        className={`p-2 rounded-md`}
        onChange={(e) =>
          setList(
            categoriesList(subcategory, e.target.value)
          )
        }
      >
        <option value="all">All Categories</option>
        {categories.map((categor) => {
          return (
            <option key={categor} value={categor}>
              {categor}
            </option>
          );
        })}
      </select>
            )
    }
    else if (activ === "none") {
        return <div></div>
    }
    else if (bestSell && activ != "none") {
        return (
          <ul className=" bg-purple-50 cursor-default text-gray-800 flex-col divide-y divide-gray-300 border-1 rounded-md flex sm:w-5/12 md:w-3/12 lg:w-2/12  justify-between">
            <li
              className={`mx-5 py-5 text-primary hover:text-primary `}
              onClick={(e) => {
                addActive(e);
                setList(makegrid(subcategory));
              }}
            >
              All
            </li>
            {categories.map((item, index) => (
              <li
                className={`mx-5 py-3`}
                onClick={(e) => {
                  addActive(e);
                  setList(makegrid(categoriesList(subcategory, item)));
                }}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        );
    }
      
  
}
else {
    return <div></div>
}
}


export default Subcategory