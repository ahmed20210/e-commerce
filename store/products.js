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
    sortProducts: (state, action) => {
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
  },
  extraReducers: (builder) => {
    builder.addCase(setCategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(setCategories.fulfilled, (state, action) => {
      state.categories = action.payload;

      state.loading = false;
    });
    builder.addCase(searchp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchp.fulfilled, (state, action) => {
      state.searchList = action.payload;
      state.loading = false;
    });
  },
});
export const setCategories = createAsyncThunk(
  "products/setCategories",
  async () => {
    const categories = await axios.get(
      "https://fake-e-commerce-api.onrender.com/categories"
    );
    return categories.data;
  }
);
export const searchp = createAsyncThunk(
  "products/searchp",
  async ({ search, option }) => {
    const res = await axios.get(
      "https://fake-e-commerce-api.onrender.com/product/search/" + search
    );
    if (option === "all") {
      return res.data;
    } else {
      return res.data.filter((product) => {
        return product.category === option;
      });
    }
  }
);

export default productsSlice.reducer;
export const { setProducts, sortProducts, clearsortProducts } =
  productsSlice.actions;
