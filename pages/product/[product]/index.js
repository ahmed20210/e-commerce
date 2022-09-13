import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Rating from "../../../components/Rating";
import { AiOutlineHeart } from "react-icons/ai";
import { RiStarSFill } from "react-icons/ri";
import { MdStarBorder } from "react-icons/md";
import home from "../../../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cart";
import { addWhiteList } from "../../../store/whitelist";

function Product({ product }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Qty, changeQty] = useState(1);
  const [details, setDetails] = useState(true);
  const [rating, setRating] = useState(0);
  const [rate, setRate] = useState("");
  const [userReview, setUserReview] = useState([]);
    const logedin = useSelector((state) => state.user.logedin);

  const review = async () => {
    if (!router.isFallback) {
      
      const res = await axios.get(
        `https://fake-e-commerce-api.onrender.com/product/reviews/${product._id}`,
        {
          withCredentials: true,
        }
      );

      setUserReview(res.data);
    }
  };
  const addReview = async () => {
   
    if (logedin) {
      const res = await axios.post(
        `https://fake-e-commerce-api.onrender.com/product/reviews/${product._id}/add`,
        {
          review: rate,
          rating: rating,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUserReview([res.data]);
      }
    } else {
      router.push("/login");
    }
  };
  const revmoveReview = async () => {
    const res = await axios.delete(
      `https://fake-e-commerce-api.onrender.com/product/reviews/${product._id}/delete`,

      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      setUserReview([]);
     
    }
  };
  const updateReview = async () => {
    const res = await axios.put(
      `https://fake-e-commerce-api.onrender.com/product/reviews/${product._id}/update`,
      {
        review: rate,
        rating: rating,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      setUserReview([res.data]);
    }
  };

  useEffect(() => {
    review();
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="mx-10">
        <div className="my-10 flex justify-center relative flex-col sm:flex-row">
          <div className="sm:w-6/12 mr-5 flex justify-center items-center rounded-md border-1">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
            />
          </div>
          <div className="sm:w-7/12 ml-5 flex items-start flex-col justify-start">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <Rating product={product} />
            <p className="text-primary text-2xl font-bold">
              ${product.price}.00
            </p>
            <div className="flex items-center bg-slate-300 rounded-md px-1 my-5">
              <span className="py-2">
                <label>Qty</label>
                <input
                  onChange={(e) => changeQty(e.target.value)}
                  className="w-8 mx-3 px-1 rounded-md"
                  placeholder="1"
                />
              </span>

              <span
                onClick={() => {
                  if (Qty > 1) {
                    dispatch(addToCart(product._id));
                    dispatch(increaseCart(product._id, Qty));
                  } else {
                    dispatch(addToCart(product._id));
                  }
                }}
                className="px-5 py-2 font-semibold text-sm cursor-pointer bg-primary rounded-md text-white"
              >
                ADD TO CART
              </span>
              <span
                onClick={() => dispatch(addWhiteList(product._id))}
                className={home.iconItem}
              >
                <AiOutlineHeart />
              </span>
            </div>
            <p className="text-slate-700 leading-7">
              {product.description.slice(0, 400)}
            </p>
          </div>
        </div>

        <div className="my-10 ">
          <div className="my-5 font-bold">
            <span
              onClick={() => setDetails(true)}
              className="px-3 py-2 bg-green-400 rounded-md text-white m-1 hover:bg-green-500 cursor-pointer"
            >
              details
            </span>
            <span
              onClick={() => setDetails(false)}
              className="px-3 py-2 bg-green-400 rounded-md text-white m-1 hover:bg-green-500 cursor-pointer"
            >
              Reviews
            </span>
          </div>
          <div className="border max-h-screen  overflow-y-scroll rounded-lg p-5">
            {details ? (
              <p className=" text-gray-700 font-light font-mono">
                {product.description}
              </p>
            ) : (
              <div>
                <ul>
                  {userReview.length > 0 && userReview !== "Unauthorized"
                    ? userReview.map((review, index) => (
                        <li
                          key={review._id}
                          className="my-4 flex flex-col gap-1 p-3 border rounded-lg"
                        >
                          <p>your rate:</p>
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <span key={i}>
                                {i > review.rating ? (
                                  <MdStarBorder />
                                ) : (
                                  <RiStarSFill />
                                )}
                              </span>
                            ))}
                          </div>
                          <p>{review.review}</p>
                          <h4 className="font-bold">{review.name}</h4>
                          <button
                            onClick={() => {
                              revmoveReview();
                            }}
                            className="px-3 w-44 py-2 bg-green-400 rounded-md text-white hover:bg-green-500"
                          >
                            REMOVE REVIEW
                          </button>
                        </li>
                      ))
                    : null}
                </ul>
                <div>
                  <div>
                    <div> Rate our product</div>
                    <div className="flex text-yellow-400 items-center my-1">
                      {[1, 2, 3, 4, 5].map((i, index) => (
                        <span
                          onClick={() => {
                            setRating(i);
                          }}
                          key={i}
                        >
                          {i > rating ? <MdStarBorder /> : <RiStarSFill />}
                        </span>
                      ))}
                    </div>
                    <div className="my-3">
                      <form className="">
                        <textarea
                          onChange={(e) => setRate(e.target.value)}
                          className=" px-2 py-2 rounded-md focus:outline-none border"
                          placeholder="Write your review"
                        />
                      </form>
                    </div>

                    <button
                      onClick={() => {
                        userReview.length === 0 || userReview == "Unauthorized"
                          ? addReview()
                          : updateReview();
                      }}
                      className="px-3 py-2 bg-green-400 rounded-md text-white hover:bg-green-500"
                    >
                      SUBMIT REVIEW
                    </button>
                  </div>
                  <div>
                    <ul>
                      {product.rate.reviews.map((rev) => (
                        <li key={rev._id} className="my-4 flex flex-col gap-1">
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <span key={i}>
                                {i > rev.rating ? (
                                  <MdStarBorder />
                                ) : (
                                  <RiStarSFill />
                                )}
                              </span>
                            ))}
                          </div>
                          <p>{rev.review}</p>
                          <h4 className="font-bold">{rev.name}</h4>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
export async function getStaticProps(context) {
  const { params } = context;
  const product = await axios.get(
    `https://fake-e-commerce-api.onrender.com/product/${params.product}`
  );
  return {
    props: {
      product: product.data,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { product: "62dbf9762dd27153fa116536" } }],
    fallback: true,
  };
}
