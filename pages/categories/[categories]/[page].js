import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaList } from "react-icons/fa";
import { AiOutlineHeart, AiFillFilter } from "react-icons/ai";
import { BsSearch, BsGrid3X3GapFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import home from "../../../styles/Home.module.css";
import { addWhiteList } from "../../../store/whitelist";
import Rating from "../../../components/Rating";
import { addToCart } from "../../../store/cart";
import { setquk } from "../../../store/quk";
import { useRouter } from "next/router";
import Budget from "../../../components/Budget";
function Categories({ categories }) {
  const router = useRouter();
  const [productsList, setproductsList] = useState([]);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option, setOption] = useState("default");
  const [activeFilter, setActiveFilter] = useState(false);
  const [view, setView] = useState("grid");
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

  const [activeMenu, setActiveMenu] = useState(false);
  useEffect(() => {
    if (!router.isFallback && categories) {
      setproductsList(categories);
    }
  }, [categories]);
  if (router.fallback ) {
    return <div>Loading...</div>;
  } else if (!router.isFallback && categories) {
    return (
      <div>
        <div className="mx-3 text-gray-700 flex relative">
          <span
            onClick={() => setActiveMenu(true)}
            className="p-2 z-50 bg-gray-900 text-white rounded-full fixed bottom-10 right-10"
          >
            <AiFillFilter className="w-5 h-5" />
          </span>

          {activeMenu === true ? (
            <div
              className={`right-4 h-screen bottom-1 fixed z-50 flex justify-end items-end py-10`}
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
                        className="w-5/12 focus:outline-primary"
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
                            filterproducts(
                              sortProducts(categories, option),
                              true
                            )
                          );
                        }}
                        className="px-3 py-1 rounded-md  bg-primary text-white font-semibold hover:bg-white hover:text-gray-800"
                        type={"submit"}
                        value={"filter"}
                      />
                      <button
                        onClick={() => {
                          setActiveFilter(false);
                          setproductsList(sortProducts(categories, option));
                        }}
                        className="px-3 py-1 rounded-md bg-primary text-white font-semibold hover:bg-white  hover:text-gray-800"
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
            <h1 className="text-3xl m-5 font-bold text-gray-600">
              {router.query.categories}
            </h1>
            <div className="flex flex-col items-center">
              <div className="flex items-center flex-col sm:flex-row py-2 w-11/12 bg-gray-300 rounded-xl justify-between">
                <div className="flex gap-5 mx-5 text-gray-400">
                  <span
                    className="p-3"
                    onClick={() => {
                      setView("grid");
                    }}
                  >
                    <BsGrid3X3GapFill className="w-5 h-5" />
                  </span>
                  <span onClick={() => setView("list")} className="p-3">
                    <FaList className="w-5 h-5" />
                  </span>
                </div>
                <select
                  className="bg-white h-9 mx-3 rounded-2xl px-2 focus:outline-none border shadow "
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
              {categories.length > 0 ? (
                <ul
                  className={`flex w-full flex-wrap justify-center py-3 gap-5 ${
                    view == "grid" ? " divide-x" : null
                  }`}
                >
                  {productsList.map((product) =>
                    view === "grid" ? (
                      <li
                        key={product._id}
                        className={` bg-slate-50 rounded-3xl p-5 w-9/12 sm:w-3/12 lg:w-2/12 mb-5 text-center flex flex-col hover:shadow-md relative overflow-y-hidden ${home.icon}`}
                      >
                        <Budget product={product} />
                        <p className="font-bold text-gray-400 h-12 overflow-hidden">
                          {product.name}
                        </p>
                        <div className="h-44">
                          <Link href={`/product/${product._id}`}>
                            <a>
                              <Image
                                src={product.image}
                                width={150}
                                height={150}
                                alt={product.name}
                              />
                            </a>
                          </Link>
                          <div className="flex justify-center">
                            <div
                              className={`flex justify-center w-32 absolute z-20 ${home.show}`}
                            >
                              <span
                                onClick={() =>
                                  dispatch(addWhiteList(product._id))
                                }
                                className={home.iconItem}
                              >
                                <AiOutlineHeart />
                              </span>

                              <span
                                onClick={() => {
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
                        <div className="flex gap-4 items-center justify-center">
                          <div className="font-bold text-primary">
                            ${product.price}.00
                            <br />
                            {product.Sale.available ? (
                              <span className=" line-through text-gray-300">
                                ${product.Sale.pricebefore}.00
                              </span>
                            ) : null}
                          </div>
                          <span
                            onClick={() => {
                              dispatch(addToCart(product._id));
                              setTimeout(() => {
                                dispatch(setCart(true));
                              }, 500);
                            }}
                            className="p-2 border rounded-full hover:text-white hover:bg-primary"
                          >
                            <FaShoppingCart />
                          </span>
                        </div>
                      </li>
                    ) : (
                      <li
                        key={product._id}
                        className={`p-5 w-11/12 text-xs sm:text-base rounded-3xl bg-slate-50 sm:w-8/12 md:w-5/12 lg:w-5/12 mb-5 text-center flex hover:shadow-md relative overflow-y-hidden ${home.icon}`}
                      >
                        <Budget product={product} />
                        <div className=" w-5/12 flex items-center ">
                          <Link href={`/product/${product._id}`}>
                            <Image
                              src={product.image}
                              width={150}
                              height={150}
                              alt={product.name}
                            />
                          </Link>
                          <div className="flex justify-center ">
                            <div
                              className={`flex justify-center absolute z-20 ${home.show}`}
                            >
                              <span
                                onClick={() =>
                                  dispatch(addWhiteList(product._id))
                                }
                                className={home.iconItem}
                              >
                                <AiOutlineHeart />
                              </span>

                              <span
                                onClick={() => {
                                  setquk(product);
                                }}
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
                              ${product.price}.00
                              <br />
                              {product.Sale.available ? (
                                <span className=" line-through text-gray-300">
                                  ${product.Sale.pricebefore}.00
                                </span>
                              ) : null}
                            </div>
                            <span
                              onClick={() => dispatch(addToCart(product._id))}
                              className="p-2 border rounded-full hover:text-white hover:bg-primary"
                            >
                              <FaShoppingCart />
                            </span>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <div className=" h-screen text-2xl flex items-center justify-center">
                  No Products Found
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <ul className="flex gap-3 my-5 justify-end mr-10 lg:mr-20">
            <li className="bg-primary px-3 flex items-center justify-center rounded-full text-white">
              <Link href={`/categories/${router.query.categories}/all`}>
                <a>Show All</a>
              </Link>
            </li>
            {[1, 2, 3, 4].map((item, index) => (
              <li
                className="bg-primary w-8 h-8 flex items-center justify-center rounded-full text-white"
                key={item}
              >
                <Link href={`/categories/${router.query.categories}/${index}`}>
                  <a>{item}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Categories;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          categories: "Food",
          page: "0",
        },
      },
    ],
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { params } = context;
 if (params.page === "all") {
 const categories = await axios.get(
   `https://fake-e-commerce-api.onrender.com/product/category/${params.categories}`
 );
 return {
   props: {
     categories: categories.data,
   },
 };

}
 else { 
  const categories = await axios.get(
    `https://fake-e-commerce-api.onrender.com/product/category/${params.categories}/limit/${params.page}/9`
  )
return {
  props: {
    categories: categories.data,
  },
};
}
 
}
