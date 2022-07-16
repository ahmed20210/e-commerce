import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchcategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchcategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchcategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const fetchcategories = createAsyncThunk("categories/fetchcategories", (id) => {
  return axios
    .get(`https://e-commerce-backend-2022.herokuapp.com/categories`)
    .then((response) => response.data);
});
export default categoriesSlice.reducer;


