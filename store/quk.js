    import { createSlice } from "@reduxjs/toolkit";
const quickSlice = createSlice({
  name: "quick",
  initialState: {
    quk: {},
    active: false,
  },
  reducers: {
    setquk: (state, action) => {
      state.quk = action.payload;
      state.active = true;
      console.log(state.quk);
    },
    removeActive: (state, action) => {
        state.active = false;
        }
  },
});
export const { setquk, removeActive } = quickSlice.actions;
export default quickSlice.reducer;

