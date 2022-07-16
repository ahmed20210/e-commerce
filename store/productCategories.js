import { createSlice } from "@reduxjs/toolkit";

 const productCategoriesSlice = createSlice({
   name: "productCategories",
   initialState: {
     productCategories: [],
     searchList: [],
     

   },
   reducers: {
     setProductCategories: (state, action) => {
       state.productCategories = action.payload;
     },
   },
   sortProducts: (state, action) => {
     const { sortBy, sortOrder } = action.payload;
     if (typeof sortBy === "string") {
       if (sortOrder === "asc") {
         state.products.sort();
       }
       if (sortOrder === "desc") {
         state.products.sort().reverse();
       }
     }
     if (typeof sortBy === "number") {
       if (sortOrder === "asc") {
         state.products.sort((a, b) => a[sortBy] - b[sortBy]);
       }
       if (sortOrder === "desc") {
         state.products.sort((a, b) => b[sortBy] - a[sortBy]);
       }
     }
   },
   clearsortProducts: (state, action) => {
     state.products = action.payload;
   },
   
 });

export default productCategoriesSlice.reducer;
