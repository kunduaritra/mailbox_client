import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Compose from "./Compose";
import { Link } from "react-router-dom";
import Sentmail from "./Sentmail";
import { useDispatch } from "react-redux";
import { fetchDataFromServer } from "../store/mail-actions";

const Welcome = () => {
  const [isCompose, setIsCompose] = useState(false);
  const [isSentMail, setIsSentMail] = useState(false);
  const dispatch = useDispatch();

  const composeButtonHandler = () => {
    setIsCompose(true);
    setIsSentMail(false);
  };

  const sentMailHandler = (e) => {
    e.preventDefault();
    setIsSentMail(true);
    setIsCompose(false);
    dispatch(fetchDataFromServer());
  };
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={2}>
            <Button onClick={composeButtonHandler}>Compose</Button>
            <Col className="mt-2">
              <Link
                onClick={sentMailHandler}
                style={{ textDecoration: "none" }}
              >
                Sent Mail
              </Link>
            </Col>
          </Col>
          <Col>
            <h4 style={{ fontFamily: "Georgia" }}>Welcome to MailBox Client</h4>
            {isCompose && <Compose />}
            {isSentMail && <Sentmail />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
