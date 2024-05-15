import { createSlice } from "@reduxjs/toolkit";

export interface userAuthState {
  userId: number;
  userAuth: boolean;
}

const initialState: userAuthState = {
  userId: 0,
  userAuth: false,
};

export const UserSlice = createSlice({
  name: "userAuthSlice",
  initialState,
  reducers: {
    setUserAuth: (state) => {
      console.log(" Triggered! ");
      state.userId = 1;
      state.userAuth = true;
    },

    removeUserAuth: (state) => {
      state.userId = 0;
      state.userAuth = false;
    },
  },
});

export const { setUserAuth, removeUserAuth } = UserSlice.actions;
export default UserSlice.reducer;
