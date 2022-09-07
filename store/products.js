import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    searchList: [],
    categories: [],
    loading: true,
  },
  reducers: {
    setProducts: (state, action) => {
  state.products = action.payload;
},
    sortProducts:(state, action) => {
  const { sortBy, sortOrder } = action.payload;
  const sortb = state.products[0];
  if (typeof sortb[sortBy] === "string") {
    if (sortOrder === "asc") {
      state.products.sort((a, b) => {
        return a[sortBy].localeCompare(b[sortBy]);
      });
    } else if (sortOrder === "desc") {
      state.products.sort((a, b) => {
        return b[sortBy].localeCompare(a[sortBy]);
      });
    }
  } else if (typeof sortb[sortBy] === "number") {
    if (sortOrder === "asc") {
      state.products.sort((a, b) => a[sortBy] - b[sortBy]);
    } else if (sortOrder === "desc") {
      state.products.sort((a, b) => b[sortBy] - a[sortBy]);
    }
  }
},
    searchProducts:(state, action) => {
      const { option , search } = action.payload
  const list = state.products.filter((product) => {
    if (option === "0") {
      return product.name.toLowerCase().includes(search.toLowerCase());
    }
    else{

    return product.name.toLowerCase().includes(search.toLowerCase())&&product.category===option;
    }
  });
  state.searchList = list;
}
  },
  extraReducers: (builder) => {
      builder.addCase(setCategories.pending, (state, action) => {
        state.loading = true;
      }
      );
      builder.addCase(setCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
       
        state.loading = false;
      }
      );
    }
});
export const setCategories = createAsyncThunk("products/setCategories", async () => { 
  const categories = await axios.get(
    "https://fake-e-commerce-api.onrender.com/categories"
  );
  return categories.data;
}
);



export default productsSlice.reducer;
export const { setProducts, sortProducts, clearsortProducts, searchProducts } =
  productsSlice.actions;
