import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// redux
import { setProducts } from "../store/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart";
import { addWhiteList } from "../store/whitelist";
// components
import Hotdeals from "../components/Hotdeals";
import QuickPreview from "../components/QuickPreview";
import Product from "./product1";

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
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineWarningAmber, MdStars } from "react-icons/md";
// styles

export default function Home({ categories, products }) {
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

  const addActive = (e) => {
    const current = e.target;
    current.parentElement.childNodes.forEach((item) => {
      item.classList.remove("text-primary");
    });
    current.classList.add("text-primary");
  };
  useEffect(() => {
    dispatch(setProducts(products));
  }, []);
  return (
    <div className="overflow-x-hidden">
      {active ? <QuickPreview product={quk} activ={setActive} /> : null}
      <div className="mx-1 sm:mx-5 md:mx-7">
        <div className="">
          <div className="flex">
            <div className="w-full">
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
                  <Image layout="responsive" src={slider1} alt="slider1" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image layout="responsive" src={slider2} alt="slider2" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image layout="responsive" src={slider3} alt="slider3" />
                </SwiperSlide>
              </Swiper>
              <div>
                <ul className="flex mx-5 sm:mx-0 justify-evenly flex-col sm:flex-row">
                  <li
                    className={`sm:w-3/13 my-5 hover:border-primary hover:bg-cyan-50 mx-3 px-8 py-3 text-center border-2  rounded-md border-neutral-700`}
                  >
                    <span className="flex justify-center">
                      <FiTruck className="w-8 h-8" />
                    </span>
                    <h3 className="font-bold ">Free Shipping</h3>
                    <p>Free shipping on all US orders</p>
                  </li>
                  <li
                    className={`hover:border-primary hover:bg-cyan-50  sm:w-3/13 my-5 mx-3 px-8 py-3 text-center border-2 rounded-md border-neutral-700`}
                  >
                    <span className="flex justify-center">
                      <RiExchangeDollarFill className="w-8 h-8" />
                    </span>
                    <h3 className="font-bold ">Money Guarantee</h3>
                    <p>30 days money back guarantee</p>
                  </li>
                  <li
                    className={`hover:border-primary hover:bg-cyan-50  sm:w-3/13 my-5 mx-3 px-8 py-3 text-center border-2 rounded-md border-neutral-700`}
                  >
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
              <Image
                src={banner1}
                layout="fixed"
                height={485}
                width={250}
                alt="banner1"
              />
            </div>
            <div className="w-full">
              <h2 className="my-3">
                <span className={`text-white bg-primary p-2 pb-3 rounded-md`}>
                  <BsClockHistory className="inline" />
                </span>
                <span className="font-bold text-xl ml-2">DEAL OF THE DAY</span>
              </h2>
              <div className="border-2 bg-lime-50 rounded-md flex flex-col lg:flex-row">
                <div className="lg:w-2/12">
                  <ul className="flex lg:flex-col items-center justify-evenly gap-1 sm:gap-3">
                    {hotDeals.map((product) => {
                      return (
                        <li
                          onClick={() => changeHotdeal(product)}
                          key={product._id}
                          className={`border-2 border-gray-300 my-3 py-3 rounded-md hover:border-primary`}
                        >
                          <Image
                            src={product.image}
                            width={70}
                            height={50}
                            alt={product.name}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="lg:w-10/12 h-full flex-col lg:flex-row flex items-center justify-between">
                  <div className="flex justify-center pt-3 items-center w-5/12">
                    <Link href={`/product/${hotdeal._id}`}>
                      <a>
                        <Image
                          src={hotdeal.image}
                          width={300}
                          height={300}
                          alt={hotdeal.name}
                        />
                      </a>
                    </Link>
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
                      <p className={`my-3 text-primary font-bold text-xl`}>
                        ${Math.floor((hotdeal.price * 90) / 100)}.00
                        <span className="mx-5 line-through text-slate-500 font-normal">
                          ${hotdeal.price}.00
                        </span>
                      </p>
                      <div className="my-3">
                        <span
                          onClick={() => dispatch(addToCart(hotdeal._id))}
                          className={`mr-2 px-5 py-3 bg-primary rounded-md text-white font-bold`}
                        >
                          ADD TO CART
                        </span>
                        <button
                          className={`p-3 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white`}
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
            <h2 className="my-5 ">
              <span className={`p-2 pb-3 rounded-md bg-primary mr-3`}>
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
              className={`p-2 rounded-md lg:hidden sm:block hidden`}
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
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[]}
              className="mySwiper"
            >
              {FEATURED.map((product, index) => (
                <SwiperSlide key={index}>
                  <Product product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="flex my-5 flex-col sm:flex-row">
          <div className="sm:w-6/12 sm:mr-5">
            <Image
              src={banner4}
              layout="responsive"
              width={1000}
              height={300}
              alt="banner4"
            />
          </div>
          <div className=" sm:w-6/12">
            <Image
              src={banner5}
              layout="responsive"
              width={1000}
              height={300}
              alt="banner5"
            />
          </div>
        </div>
        <div className="mt-20">
          <div className="flex items-center justify-between my-5">
            <h2 className=" text-xs md:text-lg font-bold ">
              <span className={`p-2 pb-4 rounded-md bg-primary mr-1`}>
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
              className={`p-2 rounded-md hidden sm:block smd:hidden`}
              onChange={(e) =>
                setNewArrival(
                  categoriesList(
                    subCategoriesList("New Arrival"),
                    e.target.value
                  )
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
          </div>
          <div>
            <Swiper
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper h-96"
            >
              {NewArrival.map((product, index) => (
                <SwiperSlide key={index}>
                  <Product product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="my-10">
          <div>
            <h2 className="text-xl font-bold">
              <span
                className={`p-2 pb-3 bg-primary rounded-md text-sm sm:text-lg text-white mr-3`}
              >
                <RiMedalFill className="inline w-6 h-6" />
              </span>
              BESTSELLING
            </h2>
          </div>
          <div className="my-5 flex gap-2">
            <ul className=" bg-purple-50 cursor-default text-gray-800 flex-col divide-y divide-gray-300 border-1 rounded-md hidden sm:flex sm:w-5/12 md:w-3/12 lg:w-2/12 text-lg  justify-between">
              <li
                className={`mx-5 py-5 text-primary hover:text-primary `}
                onClick={(e) => {
                  addActive(e);
                  changeBestSelling(
                    makegrid(categoriesList(bestSeller, "all"))
                  );
                }}
              >
                All
              </li>
              {categories.slice(0, 14).map((item, index) => (
                <li
                  className={`mx-5 py-3`}
                  onClick={(e) => {
                    addActive(e);
                    changeBestSelling(
                      makegrid(categoriesList(bestSeller, item))
                    );
                  }}
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>

            <Swiper
              breakpoints={{
                420: {
                  slidesPerView: 1,
                  spaceBetween: 0.1,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },

                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              className="mySwiper"
            >
              {bestSelling.map((item, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="flex flex-col">
                    {item.map((product, i) => (
                      <Product key={i} product={product} />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
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
    },
  };
}
