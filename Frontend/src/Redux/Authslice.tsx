import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface Authstate {
  username: string;
  logedin: boolean;
}

const Authslice = createSlice({
  name: "Auth",
  initialState: {
    username: "guest",
    logedin: false,
  },
  reducers: {
    Setlogin(state: Authstate, action: PayloadAction<string>) {
      state.username = action.payload;
      state.logedin = true;
    },
    Setlogout(state: Authstate) {
      state.username = "guest";
      state.logedin = false;
    },
  },
});

export const Authaction = Authslice.actions;
export default Authslice;
