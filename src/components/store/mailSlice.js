import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { sentMailItems: [], inboxMailItems: [] };

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    sentMail(state, action) {
      state.sentMailItems = [];
      const data = action.payload;
      const email = localStorage.getItem("userEmail");
      Object.entries(data).forEach(([id, item]) => {
        if (item.from === email) {
          state.sentMailItems = [...state.sentMailItems, { id: id, ...item }];
        }
      });
    },
    inboxMail(state, action) {
      state.inboxMailItems = [];
      const data = action.payload;
      const email = localStorage.getItem("userEmail");
      Object.entries(data).forEach(([id, item]) => {
        if (item.to === email) {
          state.inboxMailItems = [...state.inboxMailItems, { id: id, ...item }];
        }
      });
    },
  },
});

export const mailSliceActions = mailSlice.actions;

export default mailSlice.reducer;
