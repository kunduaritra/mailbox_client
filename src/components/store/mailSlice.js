import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { sentMail: [] };

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    sentMail(state, action) {
      const data = action.payload;
      state.sentMail = data;
    },
  },
});

export const mailSliceActions = mailSlice.actions;

export default mailSlice.reducer;
