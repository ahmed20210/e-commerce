import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 const userCartSlice = createSlice({
  name: "userCart",
  initialState: {
    userCart: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.pending, (state, action) => {
      state.loading = true;
    }
    );
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.loading = false;
    }
    );
    builder.addCase(fetchUserCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    }
    );
    builder.addCase(addToCart.pending, (state, action) => {
      state.loading = true;
    }
    );
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.loading = false;
    }
    );
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    }
    );
    builder.addCase(removeFromCart.pending, (state, action) => {
      state.loading = true;
    }
    );
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.loading = false;
    }
    );
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    }
    );
    builder.addCase(increaseCart.pending, (state, action) => {
      state.loading = true;
    }
    );
    builder.addCase(increaseCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.loading = false;
    }
    );
    builder.addCase(increaseCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    }
    );
    builder.addCase(decreaseCart.pending, (state, action) => {
      state.loading = true;
    }
    );
    builder.addCase(decreaseCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.loading = false;
    }
    );
    builder.addCase(decreaseCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    }
    );
    builder.addCase(clearCart.pending, (state, action) => {
      state.loading = true;
    }
    );
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.loading = false;
    }
    );
    builder.addCase(clearCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    }
    );

  }
}
);
export const fetchUserCart = createAsyncThunk("userCart/fetchuserCart", (id) => {
  return axios
    .get(`https://e-commerce-backend-2022.herokuapp.com/cart`)
    .then((response) => response.data);
});
export const addToCart = createAsyncThunk("userCart/addToCart", (id) => {
  return axios
    .post(`https://e-commerce-backend-2022.herokuapp.com/cart/add`, id)
    .then((response) => response.data);
})
export const removeFromCart = createAsyncThunk("userCart/removeFromCart", (id) => {
  return axios
  .post(`https://e-commerce-backend-2022.herokuapp.com/cart/delete`, id)
  .then((response) => response.data);
})
export const increaseCart = createAsyncThunk("userCart/icreaseCart", (id, quantity) => {
  return axios
  .post(`https://e-commerce-backend-2022.herokuapp.com/cart/increase`, {id, quantity:quantity||1 })
  .then((response) => response.data);
})
export const decreaseCart = createAsyncThunk("userCart/decreaseCart", (id) => {
  return axios
  .post(`https://e-commerce-backend-2022.herokuapp.com/cart/decrease`,id)
  .then((response) => response.data);
})
export const clearCart = createAsyncThunk("userCart/clearCart", () => {
  return axios
  .post(`https://e-commerce-backend-2022.herokuapp.com/cart/remove`)
  .then((response) => response.data);
}
)


export default userCartSlice.reducer;



