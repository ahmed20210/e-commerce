import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const userCartSlice = createSlice({
  name: "userCart",
  initialState: {
    cartItems: {},
    loading: true,
    error: null,
    cartlength: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartlength = action.payload
      state.loading = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.cartlength = action.payload.products.length;

      state.loading = false;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(increaseCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.loading = false;
    });
    builder.addCase(increaseCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(decreaseCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.loading = false;
    });
    builder.addCase(decreaseCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.cartlength = 0;
      state.loading = false;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(changeCart.fulfilled, (state, action) => {
      console.log(action.payload);
      state.cartItems = action.payload;
      state.loading = false;
    });
    builder.addCase(changeCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});
const cartObj = async () => {
  return axios
    .get(`https://e-commerce-backend-2022.herokuapp.com/cart`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};

export const fetchUserCart = createAsyncThunk("userCart/fetchuserCart", () => {
  return cartObj()
});
export const addToCart = createAsyncThunk("userCart/addToCart", (id) => {
  return axios
    .post(
      `https://e-commerce-backend-2022.herokuapp.com/cart/add`,
      { productId: id },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
    return  cartObj().then((data) => {
        return data.products.length;
      });
    });
});

export const removeFromCart = createAsyncThunk(
  "userCart/removeFromCart",
  (id) => {
    return axios
      .post(
        `https://e-commerce-backend-2022.herokuapp.com/cart/delete`,
        { productId: id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        return cartObj();
      });
  }
);
export const increaseCart = createAsyncThunk("userCart/icreaseCart", (id) => {
  return axios
    .post(
      `https://e-commerce-backend-2022.herokuapp.com/cart/increase`,
      {
        productId: id,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      return cartObj();
    });
});
export const decreaseCart = createAsyncThunk("userCart/decreaseCart", (id) => {
  return axios
    .post(
      `https://e-commerce-backend-2022.herokuapp.com/cart/decrease`,
      {
        productId: id,
      },
      {
        withCredentails: true,
      }
    )
    .then((response) => {
      return cartObj();
    });
});
export const clearCart = createAsyncThunk("userCart/clearCart", async () => {
  const res = await axios.post(
    "https://e-commerce-backend-2022.herokuapp.com/cart/remove",
    {},
    { withCredentials: true }
  );
  return cartObj();
});
export const changeCart = createAsyncThunk(
  "userCart/changeCart",
  ({ id, quantity }) => {
    return axios
      .post(
        `https://e-commerce-backend-2022.herokuapp.com/cart/update`,
        { productId: id, quantity: quantity },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        return cartObj();
      });
  }
);

export default userCartSlice.reducer;
