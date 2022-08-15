import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from "./cart";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import productCategoriesReducer from "./productCategories";
import userReducer from "./user";
import { createLogger } from "redux-logger";
import whiteListReducer from "./whitelist";
const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: userCartReducer,
    whiteList: whiteListReducer,
    
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger()),
});
export default store;