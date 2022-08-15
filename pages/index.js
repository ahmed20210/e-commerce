import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
// redux
import { setProducts, sortProducts, searchProducts } from "../store/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cart";
import { addWhiteList } from "../store/whitelist";
import { Oauth } from "../store/user";
// components
import Header from "../components/Header";
import Hotdeals from "../components/Hotdeals";
import QuickPreview from "../components/QuickPreview";
import Rating from "../components/Rating";

// images
import slider1 from "../images/slider-1.jpg";
import slider2 from "../images/slider-2.jpg";
import slider3 from "../images/slider-3.jpg";
import banner1 from "../images/ad-banner-sidebar.jpg";
import banner4 from "../images/banner4.jpg";
import banner5 from "../images/banner5.jpg";
// SWIPER
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/grid";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Icons
import { FiTruck } from "react-icons/fi";
import { RiExchangeDollarFill, RiMedalFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsClockHistory, BsSearch } from "react-icons/bs";
import { MdOutlineWarningAmber, MdStars } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

// styles
import home from "../styles/Home.module.css";

export default function Home({ subCategories, categories, products }) {
  const subCategoriesList = (sub) => {
    return products.filter((product) => {
      return product.subcategory
        .map((subCategory) => {
          return subCategory;
        })
        .includes(sub);
    });
  };
  const categoriesList = (products, cat) => {
    if (cat === "all") {
      return products;
    } else {
      return products.filter((product) => {
        return product.category === cat;
      });
    }
  };

  const [FEATURED, setFEATURED] = useState(
    categoriesList(subCategoriesList("Featured"), "all")
  );
  const [NewArrival, setNewArrival] = useState(
    categoriesList(subCategoriesList("New Arrival"), "all")
  );
  const bestSeller = subCategoriesList("Best Seller").concat(
    subCategoriesList("Top Rated")
  );
  const makegrid = (p) => {
    let grid = [];
    for (let i = 0; i < p.length; i += 2) {
      const t = p.slice(i, i + 2);

      grid.push(t);
    }
    return grid;
  };
  const hotDeals = subCategoriesList("Top Rated").slice(22, 26);
  const [hotdeal, changeHotdeal] = useState(hotDeals[0]);
  const [bestSelling, changeBestSelling] = useState(makegrid(bestSeller));
  const [active, setActive] = useState(false);
 
  const dispatch = useDispatch();

  // dispatch(setProducts(productList));
  dispatch(Oauth());
  const addActive = (e) => {
    const current = e.target;
    current.parentElement.childNodes.forEach((item) => {
      item.classList.remove("text-primary");
    });
    current.classList.add("text-primary");
  };

  return (
    <div className="mx-1 sm:mx-5 md:mx-7">
      {active ? <QuickPreview product={hotdeal} activ={setActive} /> : null}
      <Header categories={categories} />
      <div>
        <div className="flex">
          <div className="hidden lg:block lg:w-3/12 h-auto"></div>
          <div className="w-full lg:w-9/12">
            <Swiper
              navigation={true}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide className="">
                <Image layout="responsive" src={slider1} />
              </SwiperSlide>
              <SwiperSlide>
                <Image layout="responsive" src={slider2} />
              </SwiperSlide>
              <SwiperSlide>
                <Image layout="responsive" src={slider3} />
              </SwiperSlide>
            </Swiper>
            <div>
              <ul className="flex mx-5 sm:mx-0 justify-evenly flex-col sm:flex-row">
                <li className="sm:w-3/13 my-5 mx-3 px-8 py-3 text-center border-2  rounded-md border-neutral-700">
                  <span className="flex justify-center">
                    <FiTruck className="w-8 h-8" />
                  </span>
                  <h3 className="font-bold ">Free Shipping</h3>
                  <p>Free shipping on all UK orders</p>
                </li>
                <li className="sm:w-3/13 my-5 mx-3 px-8 py-3 text-center border-2 rounded-md border-neutral-700">
                  <span className="flex justify-center">
                    <RiExchangeDollarFill className="w-8 h-8" />
                  </span>
                  <h3 className="font-bold ">Money Guarantee</h3>
                  <p>30 days money back guarantee</p>
                </li>
                <li className="sm:w-3/13 my-5 mx-3 px-8 py-3 text-center border-2 rounded-md border-neutral-700">
                  <span className="flex justify-center">
                    <BiSupport className="w-8 h-8" />
                  </span>
                  <h3 className="font-bold ">ONLINE SUPPORT</h3>
                  <p>We support online 24/24 on day</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex">
          <div className="hidden lg:block lg:w-3/12 pt-14 h-full">
            <Image src={banner1} layout="fixed" height={485} width={250} />
          </div>
          <div className="w-full mx-5">
            <h2 className="my-3">
              <span className="text-white bg-primary p-2 pb-3 rounded-md">
                <BsClockHistory className="inline" />
              </span>
              <span className="font-bold text-xl ml-2">DEAL OF THE DAY</span>
            </h2>
            <div className="border-2 border-gray-500 rounded-md flex flex-col lg:flex-row">
              <div className="lg:w-2/12">
                <ul className="flex lg:flex-col items-center lg:justify-evenly justify-center gap-4">
                  {hotDeals.map((product) => {
                    return (
                      <li
                       
                      onClick={() => changeHotdeal(product)}
                        key={product._id}
                        className="border-2 border-gray-300 my-3 py-3 rounded-md hover:border-primary"
                      >
                        <Image src={product.image} width="70%" height="50%" />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="lg:w-10/12 h-full flex-col lg:flex-row flex items-center justify-between">
                <div className="flex justify-center pt-3 items-center w-5/12">
                  <Image src={hotdeal.image} width="300" height="300" />
                </div>
                <div className="m-5 w-11/12 md:w-7/12">
                  <div className=" flex flex-col items-center lg:items-start">
                    <div className=" w-10/12 ">
                      <Hotdeals />
                    </div>
                    <h2 className="my-3 text-2xl font-semibold text-gray-800">
                      {hotdeal.name}
                    </h2>
                    <p className="my-3 text-slate-500">
                      {hotdeal.description.slice(0, 150)}
                    </p>
                    <p className="my-3 text-primary font-bold text-xl">
                      ${Math.floor((hotdeal.price * 90) / 100)}.00
                      <span className="mx-5 line-through text-slate-500 font-normal">
                        ${hotdeal.price}.00
                      </span>
                    </p>
                    <div className="my-3">
                      <span
                        onClick={()=>dispatch(addToCart(hotdeal._id))}
                        className="mr-2 px-5 py-3 bg-primary rounded-md text-white font-bold"
                      >
                        ADD TO CART
                      </span>
                      <button
                        className="p-3 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white"
                      >
                        <AiOutlineHeart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex items-center justify-between my-5">
          <h2>
            <span className="p-2 pb-3 rounded-md bg-primary mr-3">
              <MdStars className="inline w-7 h-7 text-white" />
            </span>
            FEATURED PRODUCTS
          </h2>
          <ul className={` border-1 rounded-md divide-x hidden lg:flex`}>
            <li
              className={`px-3 my-3 hover:text-primary text-primary w-2/12`}
              onClick={(e) => {
                addActive(e);
                setFEATURED(
                  categoriesList(subCategoriesList("Featured"), "all")
                );
              }}
            >
              All
            </li>
            {categories.slice(1, 8).map((item, index) => (
              <li
                className={`px-3  my-3 hover:text-primary ${
                  item === "Watches" ? "hidden" : ""
                }`}
                onClick={(e) => {
                  addActive(e);
                  setFEATURED(
                    categoriesList(subCategoriesList("Featured"), item)
                  );
                }}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
          <select
            className={`p-2 rounded-md lg:hidden`}
            onChange={(e) =>
              setFEATURED(
                categoriesList(subCategoriesList("Featured"), e.target.value)
              )
            }
          >
            <option value="all">All Categories</option>
            {categories.map((categor) => {
              return (
                <option
                  key={categor}
                  value={categor}
                  className={`${categor === "Watches" ? "hidden" : ""}`}
                >
                  {categor}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 0.1,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 0.1,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 0.1,
              },
            }}
            modules={[]}
            className="mySwiper"
          >
            {FEATURED.map((product, index) => (
              <SwiperSlide
                className={`text-center border-1 p-5 min-h-full hover:border-2 hover:border-primary rounded-md ${home.iconList}`}
                key={index}
              >
                <div className="h-52 relative overflow-y-hidden">
                  <Image
                    src={product.image}
                    className="max-h-full"
                    width="200"
                    height="200"
                  />
                  <div className="flex justify-center">
                    <div
                      className={`flex justify-center w-32 absolute z-20 ${home.show}`}
                    >
                      <span onClick={()=>dispatch(addToCart(product._id))} className={home.iconItem}>
                        <FaShoppingCart />
                      </span>
                      <span
                       onClick={()=>dispatch(addWhiteList(product._id))}
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
                <h2 className="text-slate-800">{product.name} </h2>
                <p className="text-primary font-bold text-xl my-3">
                  ${product.price}.00{" "}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="flex my-5">
        <div className="w-6/12 mr-5">
          <Image src={banner4} layout="responsive" width="1000" height="300" />
        </div>
        <div className=" w-6/12">
          <Image src={banner5} layout="responsive" width="1000" height="300" />
        </div>
      </div>
      <div className="mt-20">
        <div className="flex items-center justify-between my-5">
          <h2>
            <span className="p-2 pb-4 text-sm sm:text-lg rounded-md bg-primary mr-3 font-bold">
              <MdOutlineWarningAmber className="inline w-7 h-7 text-white" />
            </span>
            NEW ARRIVALS
          </h2>
          <ul className={`border-1 rounded-md divide-x hidden smd:flex`}>
            <li
              className={`px-5 my-3 hover:text-primary text-primary`}
              onClick={(e) => {
                addActive(e);
                setNewArrival(
                  categoriesList(subCategoriesList("New Arrival"), "all")
                );
              }}
            >
              All
            </li>
            {categories.slice(1, 9).map((item, index) => (
              <li
                className={`px-5 my-3 hover:text-primary ${
                  item === "Watches" ? "hidden" : ""
                }`}
                onClick={(e) => {
                  addActive(e);
                  setNewArrival(
                    categoriesList(subCategoriesList("New Arrival"), item)
                  );
                }}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
          <select
            className={`p-2 rounded-md smd:hidden`}
            onChange={(e) =>
              setNewArrival(
                categoriesList(subCategoriesList("New Arrival"), e.target.value)
              )
            }
          >
            <option value="all">All Categories</option>
            {categories.map((categor) => {
              return (
                <option
                  key={categor}
                  value={categor}
                  className={`${categor === "Watches" ? "hidden" : ""}`}
                >
                  {categor}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 0.1,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 0.1,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 0.1,
              },
            }}
            className="mySwiper h-96"
          >
            {NewArrival.map((product, index) => (
              <SwiperSlide
                className={`text-center border-1 p-5 min-h-full hover:border-2 hover:border-primary rounded-md ${home.iconList}`}
                key={index}
              >
                <div className="h-52 relative overflow-y-hidden">
                  <Image
                    src={product.image}
                    className="max-h-full"
                    width="200"
                    height="200"
                  />
                  <div className="flex justify-center">
                    <div
                      className={`flex justify-center w-32 absolute z-20 ${home.show}`}
                    >
                      <span
                      onClick={() => dispatch(addWhiteList(product._id))}
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
                <h2 className="text-slate-800">{product.name} </h2>
                <p className="text-primary font-bold text-xl my-3">
                  ${product.price}.00{" "}
                </p>
                <span
                  onClick={()=>dispatch(addToCart(product._id))}
                  className={`py-2 px-3 bg-primary text-white rounded-md`}
                >
                  ADD TO CART
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-xl font-bold">
          <span className="p-2 pb-3 bg-primary rounded-md text-sm sm:text-lg text-white mr-3">
            <RiMedalFill className="inline w-6 h-6" />
          </span>
          BESTSELLING
        </h2>
        <div className="my-5 flex">
          <ul className="flex bg-zinc-200 cursor-default text-gray-800 flex-col divide-y divide-gray-300 border-1 rounded-md w-5/12 md:w-3/12 lg:w-2/12 text-lg ">
            <li
              className={`mx-5 py-5 text-primary hover:text-primary`}
              onClick={(e) => {
                addActive(e);
                changeBestSelling(makegrid(categoriesList(bestSeller, "all")));
              }}
            >
              All
            </li>
            {categories.slice(0, 14).map((item, index) => (
              <li
                className={`mx-5 py-3 ${item === "Watches" ? "hidden" : ""}`}
                onClick={(e) => {
                  addActive(e);
                  changeBestSelling(makegrid(categoriesList(bestSeller, item)));
                }}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>

          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 1,
              },

              1024: {
                slidesPerView: 4,
                spaceBetween: 1,
              },
            }}
            className="mySwiper w-10/12"
          >
            {bestSelling.map((item, index) => (
              <SwiperSlide key={index} className="w-3/12  ">
                <div className="flex flex-col items-center ">
                  {item.map((product, i) => (
                    <div
                      key={i + 15}
                      className={`text-center h-96 w-11/12 mb-3 border-1 p-5  hover:border-2 hover:border-primary rounded-md ${home.iconList}`}
                    >
                      <div className=" relative overflow-y-hidden">
                        <Image src={product.image} width="200" height="200" />
                        <div className="flex justify-center">
                          <div
                            className={`flex justify-center absolute z-20 ${home.show}`}
                          >
                            <span 
                            onClick={()=>dispatch(addToCart(product._id))} 
                            className={home.iconItem}>
                              <FaShoppingCart />
                            </span>
                            <span
                            onClick={()=>{
                            dispatch(addWhiteList(product._id))

                            }}
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
                      <h2 className="text-slate-800">{product.name} </h2>
                      <p className="text-primary font-bold text-xl my-3">
                        ${product.price}.00
                      </p>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const subCategory = await axios.get(
    "https://e-commerce-backend-2022.herokuapp.com/subcategories"
  );
  const productList = await axios.get(
    "https://e-commerce-backend-2022.herokuapp.com/product"
  );

  const categories = await axios.get(
    "https://e-commerce-backend-2022.herokuapp.com/categories"
  );
  return {
    props: {
      products: productList.data,
      categories: categories.data,
      subCategories: subCategory.data,
    },
  };
}
