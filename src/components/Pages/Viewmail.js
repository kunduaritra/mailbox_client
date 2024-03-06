import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Viewmail = () => {
  const { subject, content } = useParams();
  return (
    <Row className="justify-content-center">
      <Col xs={10} md={8} lg={6}>
        <Card className="mt-4">
          <Card.Body>
            <Col>
              <Card.Title className="ml-4">
                <h5>Subject: {decodeURIComponent(subject)}</h5>
              </Card.Title>
              <div
                className="text-center"
                dangerouslySetInnerHTML={{
                  __html: decodeURIComponent(content),
                }}
              />
            </Col>
            <Link
              to="/welcomemailboxclient"
              className="d-block mt-3"
              style={{ textDecoration: "none" }}
            >
              <FaHome />
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Viewmail;
