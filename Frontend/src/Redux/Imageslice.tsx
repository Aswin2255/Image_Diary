import { createSlice } from "@reduxjs/toolkit";

const Imageslice = createSlice({
  name: "image",
  initialState: {
    imageurl: [],
  },
  reducers: {
    Setimage(state, action) {
      state.imageurl = action.payload;
    },
  },
});

export const Imageaction = Imageslice.actions;
export default Imageslice;
