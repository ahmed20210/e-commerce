import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const whiteListSlice = createSlice({
  name: "whiteList",
  initialState: {
    WList: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWhiteList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWhiteList.fulfilled, (state, action) => {
      state.WList = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchWhiteList.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(addWhiteList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addWhiteList.fulfilled, (state, action) => {
      state.WList = action.payload;
      state.loading = false;
    });
    builder.addCase(addWhiteList.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(removeWhiteList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeWhiteList.fulfilled, (state, action) => {
      state.WList = action.payload;
      state.loading = false;
    });
    builder.addCase(removeWhiteList.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export const fetchWhiteList = createAsyncThunk(
  "whiteList/fetchWhiteList",
  () => {
    return axios
      .get("https://e-commerce-backend-2022.herokuapp.com/whiteList",{
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  }
);
export const addWhiteList = createAsyncThunk("whiteList/addWhiteList", (id) => {
  return axios
    .post(
      `https://e-commerce-backend-2022.herokuapp.com/whitelist/${id}/add`,
      { productId: id },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
    });
});
export const removeWhiteList = createAsyncThunk("whiteList/deleteWhiteList", (id) => {
  return axios
    .post(`https://e-commerce-backend-2022.herokuapp.com/wishlist/${id}/remove`,{
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
});
export default whiteListSlice.reducer;