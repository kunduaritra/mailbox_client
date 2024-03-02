import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import mailSlice from "./mailSlice";

const store = configureStore({
  reducer: { auth: authSlice, mail: mailSlice },
});

export default store;
