import axios from "axios";
import React, { useState } from "react";
import { setProducts, sortProducts, searchProducts } from "../store/products";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";

import { Oauth } from "../store/user";
export default function Home({ subCategories, categories, productList }) {
  const productSubCategories = subCategories.map((subCategory) => {
    const res = productList.filter((product) => {
      return (
        product.subcategory.map((subcategory0) => {
          return subcategory0;
        })[0] == subCategory
      );
    });
    return {
      subCategory: subCategory,
      products: res,
    };
  });
  const [products, changeProducts] = useState(productSubCategories);
  const dispatch = useDispatch();
  dispatch(setProducts(productList));
  dispatch(Oauth());
const logedin = useSelector((state) => state.user.logedin);
console.log(logedin);

  return (
    <div>
      <Header categories={categories} />
    </div>
  );
}

export async function getServerSideProps() {
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
      productList: productList.data,
      categories: categories.data,
      subCategories: subCategory.data,
    },
  };
}
