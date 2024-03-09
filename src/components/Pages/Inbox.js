import React, { useEffect, useState } from "react";
import { ListGroup, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";
import {
  deleteMailFromBackend,
  fetchDataFromServer,
  viewMailStatusUpdateToBackend,
} from "../store/mail-actions";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const [isLoading, setIsLoading] = useState(true);
  const inboxMailItems = useSelector((state) => state.mail.inboxMailItems);
  const updatedMailItems = Object.values(inboxMailItems).reverse();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewMailHandler = (mail) => {
    dispatch(viewMailStatusUpdateToBackend(mail));
    navigate(
      `/welcomemailboxclient/${mail.id}/${encodeURIComponent(
        mail.subject
      )}/${encodeURIComponent(mail.mailBody)}`
    );
  };

  const deleteMail = (mail) => {
    dispatch(deleteMailFromBackend(mail));
  };

  useEffect(() => {
    dispatch(fetchDataFromServer("inboxmail"));
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    fetchData();
  }, []);

  return (
    <Container>
      {isLoading && (
        <Container className="d-flex justify-content-center vh-100 mt-5">
          <PropagateLoader color="#E76660" />
        </Container>
      )}
      <ListGroup variant="flush">
        {Object.values(updatedMailItems).map((mail) => (
          <ListGroup.Item key={mail.id} style={{ cursor: "pointer" }}>
            {!mail.seenMail && <GoDotFill style={{ color: "blue" }} />}
            <Button
              variant="link"
              onClick={() => viewMailHandler(mail)}
              style={{ textDecoration: "none", color: "#B43B35" }}
            >
              {mail.subject}{" "}
              <span>
                <i>from </i>
                {mail.from}
              </span>
            </Button>
            <MdDelete
              onClick={() => deleteMail(mail)}
              style={{ color: "red", marginLeft: "8px" }}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;
