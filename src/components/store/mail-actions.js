import { mailSliceActions } from "./mailSlice";

export const sendMailToBackend = (mailDetails) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://mailboxclient-64fb0-default-rtdb.firebaseio.com/allmail.json`,
        {
          method: "POST",
          body: JSON.stringify(mailDetails),
          "Content-Type": "application/json",
        }
      );
      if (res.ok) {
        console.log("Mail Sent Successfully to the Backend!");
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const fetchDataFromServer = (mailType) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://mailboxclient-64fb0-default-rtdb.firebaseio.com/allmail.json`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (mailType === "sentmail") {
          dispatch(mailSliceActions.sentMail(data));
        } else {
          dispatch(mailSliceActions.inboxMail(data));
        }
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err);
    }
  };
};

export const viewMailStatusUpdateToBackend = (mail) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://mailboxclient-64fb0-default-rtdb.firebaseio.com/allmail/${mail.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            from: mail.from,
            mailBody: mail.mailBody,
            subject: mail.subject,
            to: mail.to,
            seenMail: true,
          }),
          "Content-Type": "appliaction/json",
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error.message);
      } else {
        dispatch(mailSliceActions.viewMail(mail));
      }
    } catch (err) {
      alert(err);
    }
  };
};
