import React from "react";
import { Container } from "react-bootstrap";
import Compose from "./Compose";

const Welcome = () => {
  return (
    <>
      <Container className="mt-5">
        <h4>Welcome to MailBox Client</h4>
        <Compose />
      </Container>
    </>
  );
};

export default Welcome;
