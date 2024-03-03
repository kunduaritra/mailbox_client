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
      state.isAuthenticated = true;
      state.userEmail = data.email;
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("isAuthenticated", "true");
    },
    logout(state) {
      state.isAuthenticated = false;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
