import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const userCartSlice = createSlice({
  name: "userCart",
  initialState: {
    cartItems: {},
    loading: true,
    message:"",
    active:false,
    error: null,
    cartlength: 0,
  },
  reducers: {
    setAcive: (state, action) => {
      state.active = false;
    }
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
      state.message = "Product successfully added to your cart"
      state.active = true
      state.loading = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.cartlength = action.payload.products.length;
      state.message = "Product successfully removed from your cart"
      state.active = true

      state.loading = false;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.cartlength = 0;
      state.message = "Your cart successfully cleared"
      state.active = true;
      state.loading = false;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(changeCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.message = "Your cart successfully updated"
      state.active = true;
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
    .get(`https://fake-e-commerce-api.onrender.com/cart`, {
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
      `https://fake-e-commerce-api.onrender.com/cart/add`,
      { productId: id },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.data === "Added to cart") {
    return  cartObj().then((data) => {
        return data.products.length
      });
      }
    });
  
});

export const removeFromCart = createAsyncThunk(
  "userCart/removeFromCart",
  (id) => {
    return axios
      .post(
        `https://fake-e-commerce-api.onrender.com/cart/delete`,
        { productId: id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data === "Removed from cart") {
          return cartObj();
        }
       
      });
  }
);
export const clearCart = createAsyncThunk("userCart/clearCart", async () => {
  const res = await axios.post(
    "https://fake-e-commerce-api.onrender.com/cart/remove",
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
        `https://fake-e-commerce-api.onrender.com/cart/update`,
        { productId: id, quantity: quantity },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
         if (response.data === "Changed") {
          return cartObj();
        }
      });
  }
);

export default userCartSlice.reducer;
export const { setAcive } = userCartSlice.actions;
