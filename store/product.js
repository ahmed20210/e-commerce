import { createSlice } from "@reduxjs/toolkit";
 const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    }
  }

});

export default productSlice.reducer;