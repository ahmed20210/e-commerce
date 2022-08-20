import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from "./cart";
import productsReducer from "./products";
import userReducer from "./user";
import whiteListReducer from "./whitelist";
import qukReducer from "./quk";
const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: userCartReducer,
    whiteList: whiteListReducer,
    quk: qukReducer,
    
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger()),
});
export default store;