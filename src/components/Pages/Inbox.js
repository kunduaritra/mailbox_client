import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { fetchDataFromServer } from "../store/mail-actions";

const Inbox = () => {
  const [isLoading, setIsLoading] = useState(true);
  const inboxMailItems = useSelector((state) => state.mail.inboxMailItems);
  const updatedMailItems = Object.values(inboxMailItems).reverse();
  const dispatch = useDispatch();

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
      {Object.values(updatedMailItems).map((mail) => (
        <Card key={mail.id}>
          <Card.Header>{mail.subject}</Card.Header>
          <Card.Body>
            <Card.Text>{mail.mailBody}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Inbox;
