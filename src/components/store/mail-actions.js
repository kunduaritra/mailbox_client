import { mailSliceActions } from "./mailSlice";

export const fetchDataFromServer = () => {
  return async (dispatch) => {
    const email = localStorage.getItem("userEmail");
    const parts = email.split("@");
    const updatedEmail = parts[0];
    try {
      const res = await fetch(
        `https://mailboxclient-64fb0-default-rtdb.firebaseio.com/sendMail/${updatedEmail}.json`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        const data = await res.json();
        dispatch(mailSliceActions.sentMail(data));
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err);
    }
  };
};
