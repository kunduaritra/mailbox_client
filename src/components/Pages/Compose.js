import React, { useRef, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { sendMailToBackend } from "../store/mail-actions";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const Compose = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isSent, setIsSent] = useState(false);
  const email = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  const toMailRef = useRef();
  const subjectInputRef = useRef();

  const sendHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!(editorState instanceof EditorState)) {
      console.error("editorState is not an instance of EditorState");
      return;
    }
    if (toMailRef.current.value && subjectInputRef.current.value) {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const htmlContent = draftToHtml(rawContentState);
      const mailDetails = {
        from: email,
        to: toMailRef.current.value,
        subject: subjectInputRef.current.value,
        mailBody: htmlContent,
      };
      dispatch(sendMailToBackend(mailDetails));
    }
    setIsLoading(false);
    toMailRef.current.value = "";
    subjectInputRef.current.value = "";
    setEditorState(EditorState.createEmpty());
    setIsSent(true);
  };

  return (
    <>
      {isSent && (
        <p>
          Mail Sent Successfully
          <span style={{ color: "green" }}>
            <RiVerifiedBadgeFill />
          </span>
        </p>
      )}
      {isLoading && (
        <Container className="d-flex justify-content-center vh-100 mt-5">
          <PropagateLoader color="#E76660" />
        </Container>
      )}
      <Container className="p-3" style={{ border: "1px solid #D0D0D0" }}>
        <Row>
          <Col>
            <Form onSubmit={sendHandler}>
              <Form.Label>
                To<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email Address"
                ref={toMailRef}
                style={{
                  backgroundColor: "#F6F6F6",
                  border: "1px solid #D0D0D0",
                }}
              />
              <Form.Label className="mt-2">
                Subject<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject"
                ref={subjectInputRef}
                style={{
                  backgroundColor: "#F6F6F6",
                  border: "1px solid #D0D0D0",
                }}
              />
              <Container
                className="mt-2"
                style={{
                  backgroundColor: "#F6F6F6",
                  border: "1px solid #D0D0D0",
                }}
              >
                <Editor
                  editorState={editorState}
                  onEditorStateChange={(newState) => setEditorState(newState)}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                />
              </Container>
              <Button type="Submit" className="mt-2">
                Send
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Compose;
