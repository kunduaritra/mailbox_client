import React, { useRef, useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "./../store/auth-slice";
import { HashLoader } from "react-spinners";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const toggleLoginHandler = () => {
    setIsLogin(!isLogin);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (
      inputEmailRef.current.value &&
      inputConfirmPasswordRef.current.value &&
      inputPasswordRef.current.value
    ) {
      if (
        inputPasswordRef.current.value === inputConfirmPasswordRef.current.value
      ) {
        try {
          const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxRwPEPoG_H8SP5mHRca19Hs-8A4MQ2lY",
            {
              method: "POST",
              body: JSON.stringify({
                email: inputEmailRef.current.value,
                password: inputPasswordRef.current.value,
                returnSecureToken: true,
              }),
              "Content-Type": "application/json",
            }
          );
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error.message);
          } else {
            console.log("Account Created Successfully");
            setIsLogin(true);
          }
        } catch (err) {
          alert(err);
        } finally {
          inputEmailRef.current.value = "";
          inputPasswordRef.current.value = "";
          inputConfirmPasswordRef.current.value = "";
        }
      }
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (inputEmailRef.current.value && inputPasswordRef.current.value) {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxRwPEPoG_H8SP5mHRca19Hs-8A4MQ2lY",
          {
            method: "POST",
            body: JSON.stringify({
              email: inputEmailRef.current.value,
              password: inputPasswordRef.current.value,
              returnSecureToken: true,
            }),
          }
        );
        if (res.ok) {
          console.log("SuccessFully Logged In");
          const data = await res.json();
          dispatch(authActions.login(data));
          navigate("/welcomemailboxclient");
        } else {
          const data = await res.json();
          setIsLoading(false);
          throw new Error(data.error.message);
        }
      } catch (err) {
        alert(err);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center vh-100 mt-5">
          <HashLoader color="#E76660" loading />
        </div>
      )}
      {!isLoading && (
        <Container>
          <Row>
            <Col xs={6} className="mt-3 mx-auto">
              <Card>
                <Card.Header
                  className="p-3"
                  style={{
                    backgroundColor: "#E76660",
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  <h5>{isLogin ? "Login" : "Sign Up"}</h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={isLogin ? loginHandler : signUpHandler}>
                    <Form.Group className="mb-2">
                      <Form.Control
                        type="text"
                        placeholder="Enter Email Address"
                        ref={inputEmailRef}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        ref={inputPasswordRef}
                      />
                    </Form.Group>
                    {!isLogin && (
                      <Form.Group className="mb-2">
                        <Form.Control
                          type="text"
                          placeholder="Confirm Password"
                          ref={inputConfirmPasswordRef}
                        />
                      </Form.Group>
                    )}
                    <Button type="submit">
                      {isLogin ? "Login" : "Sign Up"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      {!isLoading && (
        <Container>
          <Row>
            <Col xs={6} className="mx-auto mt-2">
              <Card style={{ backgroundColor: "#BEF9B2", fontWeight: "Bold" }}>
                <Card.Header>
                  <Link
                    style={{ textDecoration: "none" }}
                    onClick={toggleLoginHandler}
                  >
                    {isLogin
                      ? "Don't Have an Account? Sign Up"
                      : "Have an account? Login"}
                  </Link>
                </Card.Header>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Authentication;
