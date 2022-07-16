import { createSlice } from "@reduxjs/toolkit";
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    searchList: [],
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
});

export default productsSlice.reducer;
export const { setProducts, sortProducts, clearsortProducts, searchProducts } =
  productsSlice.actions;
