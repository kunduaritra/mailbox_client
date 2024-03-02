import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const data = action.payload;
      console.log("login successfull");
      state.isAuthenticated = true;
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("isAuthenticated", "true");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
