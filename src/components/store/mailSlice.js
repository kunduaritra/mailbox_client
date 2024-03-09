import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  sentMailItems: [],
  inboxMailItems: [],
  unreadCount: 0,
};

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
      let count = 0;
      Object.entries(data).forEach(([id, item]) => {
        if (item.to === email) {
          state.inboxMailItems = [...state.inboxMailItems, { id: id, ...item }];
          if (!item.seenMail) {
            count++;
          }
        }
      });
      state.unreadCount = count;
    },
    viewMail(state, action) {
      const mail = action.payload;
      state.inboxMailItems = state.inboxMailItems.map((item) =>
        item.id === mail.id ? mail : item
      );
    },
    deleteMail(state, action) {
      const deleteMail = action.payload;
      state.inboxMailItems = state.inboxMailItems.filter(
        (mail) => deleteMail.id !== mail.id
      );
      if (deleteMail.seenMail === false) {
        state.unreadCount--;
      }
    },
  },
});

export const mailSliceActions = mailSlice.actions;

export default mailSlice.reducer;
