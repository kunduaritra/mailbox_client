import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";

const Sentmail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const data = useSelector((state) => state.mail.sentMail);

  useEffect(() => {
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
      {Object.values(data).map((mail) => (
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

export default Sentmail;
