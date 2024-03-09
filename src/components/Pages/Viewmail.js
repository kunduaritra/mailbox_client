import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteMailFromBackend } from "../store/mail-actions";

const Viewmail = () => {
  const { id, subject, content } = useParams();
  const inboxMail = useSelector((state) => state.mail.inboxMailItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteMail = () => {
    const mailToBeDelete = inboxMail.filter((mail) => mail.id === id);
    console.log(mailToBeDelete);
    dispatch(deleteMailFromBackend(mailToBeDelete[0]));
    navigate("/welcomemailboxclient");
  };
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
              // className="d-block mt-3"
              style={{ textDecoration: "none" }}
            >
              <FaHome />
            </Link>
            <MdDelete
              onClick={deleteMail}
              style={{ color: "red", cursor: "pointer" }}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Viewmail;
