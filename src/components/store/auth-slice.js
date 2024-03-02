import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  userEmail: localStorage.getItem("userEmail") || null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const data = action.payload;
      console.log("login successfull");
      state.isAuthenticated = true;
      state.email = data.email;
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("isAuthenticated", "true");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
