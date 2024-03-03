import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Compose from "./Compose";
import { Link } from "react-router-dom";
import Sentmail from "./Sentmail";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromServer } from "../store/mail-actions";
import Inbox from "./Inbox";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { LuSendHorizonal } from "react-icons/lu";
import { IoMailOpenOutline } from "react-icons/io5";

const Welcome = () => {
  const [isCompose, setIsCompose] = useState(false);
  const [isSentMail, setIsSentMail] = useState(false);
  const [isInbox, setIsInbox] = useState(true);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.userEmail);

  const composeButtonHandler = () => {
    setIsCompose(true);
    setIsSentMail(false);
    setIsInbox(false);
  };

  const inboxButtonHandler = () => {
    setIsInbox(true);
    setIsCompose(false);
    setIsSentMail(false);
    dispatch(fetchDataFromServer("inboxmail"));
  };

  const sentMailHandler = (e) => {
    e.preventDefault();
    setIsSentMail(true);
    setIsCompose(false);
    setIsInbox(false);
    dispatch(fetchDataFromServer("sentmail"));
  };
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={2}>
            <Button onClick={composeButtonHandler}>
              Compose
              <IoMailOpenOutline />
            </Button>
            <Col className="mt-2">
              <Link
                onClick={inboxButtonHandler}
                style={{ textDecoration: "none" }}
              >
                Inbox
                <span>
                  <HiOutlineInboxArrowDown />
                </span>
              </Link>
            </Col>
            <Col className="mt-2">
              <Link
                onClick={sentMailHandler}
                style={{ textDecoration: "none" }}
              >
                Sent Mail
                <span>
                  <LuSendHorizonal />
                </span>
              </Link>
            </Col>
          </Col>
          <Col>
            <h4 style={{ fontFamily: "Georgia" }}>
              Welcome to MailBox {email}
            </h4>
            {isInbox && <Inbox />}
            {isCompose && <Compose />}
            {isSentMail && <Sentmail />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
