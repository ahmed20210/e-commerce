import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaShoppingCart, FaList } from "react-icons/fa";
import { AiOutlineHeart, AiFillFilter } from "react-icons/ai";
import { BsSearch, BsGrid3X3GapFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import home from "../../../styles/Home.module.css";
import { addWhiteList } from "../../../store/whitelist";
import Rating from "../../../components/Rating";

function Categories({ categories }) {
  const [productsList, setproductsList] = useState(categories);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option, setOption] = useState("default");
  const [activeFilter, setActiveFilter] = useState(false);
  const [active, setActive] = useState(false);
  const [view , setView] = useState("grid");

   const addActive = (e) => {
     const current = e.target;
     current.parentElement.childNodes.forEach((item) => {
       item.classList.remove("text-gray-400");
     });
     current.classList.add("text-gray-800");
   };
  const sortProducts = (list, option3) => {
    const products = [...list];
    if (option3 === "default") {
      return categories;
    }
    if (option3 === "priceasc") {
      products.sort((a, b) => a.price - b.price);
      return products;
    }
    if (option3 === "pricedesc") {
      products.sort((a, b) => b.price - a.price);
      return products;
    }
    if (option3 === "rate") {
      products.sort((a, b) => b.rate.rating - a.rate.rating);
      return products;
    }
  };

  const filterproducts = (products, statues) => {
    if (statues === true || activeFilter === true) {
      let newList = products.filter((product) => {
        return product.price >= option1 && product.price <= option2;
      });
      return newList;
    } else if (activeFilter === false) {
      return products;
    }
  };
  const dispatch = useDispatch();
  const addToWhitelist = (id) => {
    dispatch(addWhiteList(id));
  };
  const [activeMenu, setActiveMenu] = useState(false);
  return (
    <div className="mx-3 text-gray-700 flex relative">
      <span
        onClick={() => setActiveMenu(true)}
        className="p-2 z-50 bg-gray-900 text-white rounded-full fixed bottom-10 right-10"
      >
        <AiFillFilter className="w-5 h-5" />
      </span>

      {activeMenu === true ? (
        <div
          className={`right-4 h-screen fixed z-50 flex justify-end items-end py-10`}
        >
          <div className="w-44 h-52 rounded-md px-5 py-2 bg-gray-400 z-40 relative">
            <button
              onClick={() => setActiveMenu(false)}
              className="absolute top-0 right-0 px-3"
            >
              x
            </button>
            <h3 className="font-bold">Filters</h3>

            <div>
              <div className="flex flex-col border-t-2 my-2 py-5 gap-3">
                <label className="font-semibold">Price</label>
                <div className="flex justify-between">
                  <input
                    className="w-5/12 focus:outline-primary"
                    type="number"
                    name="min"
                    placeholder="min"
                    onChange={(e) => setOption1(e.target.value)}
                  />
                  <input
                    className="w-5/12"
                    type="number"
                    name="max"
                    placeholder="max"
                    onChange={(e) => setOption2(e.target.value)}
                  />
                </div>
                <div className="gap-3 flex">
                  <input
                    onClick={(e) => {
                      setActiveFilter(true);
                      setproductsList(
                        filterproducts(sortProducts(categories, option), true)
                      );
                    }}
                    className="px-3 py-1 rounded-md border-2 bg-primary text-white font-semibold hover:bg-white hover:text-gray-800"
                    type={"submit"}
                    value={"filter"}
                  />
                  <button
                    onClick={() => {
                      setActiveFilter(false);
                      setproductsList(sortProducts(categories, option));
                    }}
                    className="px-3 py-1 rounded-md border-2 bg-primary text-white font-semibold hover:bg-white  hover:text-gray-800"
                  >
                    reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="w-full text-center">
      <h1 className="text-3xl m-5 font-bold text-gray-600">{categories[0].category}</h1>
        <div className="flex flex-col items-center">
          <div className="flex items-center w-11/12 bg-gray-300 rounded-xl justify-between">
            <div className="flex gap-5 mx-5 text-gray-400">
              <span className="p-3" onClick={()=> {setView("grid")}}>
                <BsGrid3X3GapFill className="w-5 h-5" />
              </span>
              <span onClick={()=> setView("list")} className="p-3">
                <FaList className="w-5 h-5" />
              </span>
            </div>
            <select
              className="bg-white h-9 mx-10 rounded-2xl px-2 focus:outline-none border shadow"
              onChange={(e) => {
                setOption(e.target.value);

                setproductsList(
                  filterproducts(sortProducts(categories, e.target.value))
                );
              }}
            >
              <option value="default">default sorting</option>
              <option value="priceasc">Sort by price:low to high</option>
              <option value="pricedesc">Sort by price:high to low</option>
              <option value="rate">Sort by average rating</option>
            </select>
          </div>
          <ul className="flex flex-wrap divide-x py-3">
            {productsList.map((product) =>
              view === "grid" ? (
                <li
                  key={product._id}
                  className={`p-5 w-6/12 sm:w-3/12 lg:w-2/12 mb-5 text-center flex flex-col hover:shadow-md relative overflow-y-hidden ${home.icon}`}
                >
                  <p className="font-bold text-gray-400 h-12 overflow-hidden">
                    {product.name}
                  </p>
                  <div className="h-44">
                    <Image src={product.image} width={150} height={150} />
                    <div className="flex justify-center">
                      <div
                        className={`flex justify-center w-32 absolute z-20 ${home.show}`}
                      >
                        <span
                          onClick={addToWhitelist()}
                          className={home.iconItem}
                        >
                          <AiOutlineHeart />
                        </span>

                        <span
                          onClick={() => setActive(true)}
                          className={home.iconItem}
                        >
                          <BsSearch />
                        </span>
                      </div>
                    </div>
                  </div>
                  <Rating product={product} />
                  <div className="flex gap-4 items-center justify-center">
                    <div className="font-bold text-primary">
                      ${product.price}.00{" "}
                    </div>
                    <span className="p-2 border rounded-full hover:text-white hover:bg-primary">
                      <FaShoppingCart />
                    </span>
                  </div>
                </li>
              ) : (
                <li
                  key={product._id}
                  className={`p-5 w-11/12 sm:w-6/12 md:w-6/12 lg:w-4/12 mb-5 text-center flex hover:shadow-md relative overflow-y-hidden ${home.icon}`}
                >
                  <div className="h-44 w-5/12 flex items-center">
                    <Image src={product.image} width={150} height={150} />
                    <div className="flex justify-center">
                      <div
                        className={`flex justify-center w-32 absolute z-20 ${home.show}`}
                      >
                        <span
                          onClick={addToWhitelist()}
                          className={home.iconItem}
                        >
                          <AiOutlineHeart />
                        </span>

                        <span
                          onClick={() => setActive(true)}
                          className={home.iconItem}
                        >
                          <BsSearch />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-center w-7/12">
                    <p className="font-bold text-gray-400 h-12 overflow-hidden">
                      {product.name}
                    </p>
                    <Rating product={product} />
                    <p>{product.description.substring(0, 50)}</p>
                    <div className="flex gap-4 items-center justify-center">
                      <div className="font-bold text-primary">
                        ${product.price}.00{" "}
                      </div>
                      <span className="p-2 border rounded-full hover:text-white hover:bg-primary">
                        <FaShoppingCart />
                      </span>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Categories;

export async function getStaticPaths() {
  const categories = await axios.get(
    "https://e-commerce-backend-2022.herokuapp.com/categories"
  );
  const paths = categories.data.map((category) => {
    return {
      params: {
        categories: `${category}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { params } = context;
  const categories = await axios.get(
    `https://e-commerce-backend-2022.herokuapp.com/product/category/${params.categories}`
  );
  return {
    props: {
      categories: categories.data,
    },
  };
}
