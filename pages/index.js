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
import Subcategory from "./subcategory";

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

export default function Home({ featured, bestSell, trending, hot }) {
  // const subCategoriesList = (sub) => {
  //   return products.filter((product) => {
  //     return product.subcategory
  //       .map((subCategory) => {
  //         return subCategory;
  //       })
  //       .includes(sub);
  //   });
  // };
  const [FEATURED, setFEATURED] = useState(featured);

  const [TRENDING, setTRENDING] = useState(trending);
  

  const hotDeals = hot
  const [hotdeal, changeHotdeal] = useState(hotDeals[0]);
  const [bestSelling, changeBestSelling] = useState([]);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

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
                    className={`sm:w-3/13 my-5 hover:border-primary bg-gray-100 hover:bg-cyan-50 mx-3 px-8 py-3 text-center border-2  rounded-md border-neutral-700`}
                  >
                    <span className="flex justify-center">
                      <FiTruck className="w-8 h-8" />
                    </span>
                    <h3 className="font-bold ">Free Shipping</h3>
                    <p>Free shipping on all US orders</p>
                  </li>
                  <li
                    className={`hover:border-primary bg-gray-100 hover:bg-cyan-50  sm:w-3/13 my-5 mx-3 px-8 py-3 text-center border-2 rounded-md border-neutral-700`}
                  >
                    <span className="flex justify-center">
                      <RiExchangeDollarFill className="w-8 h-8" />
                    </span>
                    <h3 className="font-bold ">Money Guarantee</h3>
                    <p>30 days money back guarantee</p>
                  </li>
                  <li
                    className={`hover:border-primary bg-gray-100 hover:bg-cyan-50  sm:w-3/13 my-5 mx-3 px-8 py-3 text-center border-2 rounded-md border-neutral-700`}
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
                          height={200}
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
                          onClick={() => dispatch(addWhiteList(hotdeal._id))}
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
            <h2 className="my-5">
              <span className={`p-2 pb-3 rounded-md bg-primary mr-3`}>
                <MdStars className="inline w-7 h-7 text-white" />
              </span>
              FEATURED PRODUCTS
            </h2>
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
              TRENDING
            </h2>
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
              {TRENDING.map((product, index) => (
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
            <Subcategory cat={"BestSeller"} setList={changeBestSelling} subcategory={bestSell} />

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
              className="mySwiper w-11/12"
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
  const bestSell =await axios
    .get(
      "https://fake-e-commerce-api.onrender.com/product/subcategory/Best Seller"
    )
    
  const featured = await axios.get(
    "https://fake-e-commerce-api.onrender.com/product/subcategory/Featured/limit/1/15"
  );
  const trending = await axios.get(
    "https://fake-e-commerce-api.onrender.com/product/subcategory/Trending/limit/1/15"
  );
  const hotd = await axios.get(
    "https://fake-e-commerce-api.onrender.com/product/subcategory/Hot Deals/limit/0/6"
  );
    
const hot = hotd.data
hot.splice(3,2)
  return {
    props: {
      featured: featured.data,
      bestSell: bestSell.data,
      trending: trending.data,
      hot: hot,
    },
  };
}
