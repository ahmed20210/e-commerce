import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    logedin: false,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(Oauth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Oauth.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload === "Unauthorized") {
        state.logedin = false;
      } else if (action.payload === "Authorized") {
        state.logedin = true;
        console.log(action.payload)
      }
    });
    builder.addCase(Oauth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const Oauth = createAsyncThunk("user/Oauth", () => {
  return axios("https://e-commerce-backend-2022.herokuapp.com/oauth",{
    withCredentials: true,
  }).then((response) => {
    console.log(response.data);
    return response.data;
  });
});

export default userSlice.reducer;
