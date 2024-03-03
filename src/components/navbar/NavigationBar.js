import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { AiOutlineLogout } from "react-icons/ai";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [logoutText, setLogoutText] = useState("Logout");

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <Container style={{ backgroundColor: "#B43B35", color: "white" }} fluid>
      <Navbar style={{ color: "white" }} className="p-3">
        <Navbar.Brand href="/" style={{ color: "white", fontWeight: 700 }}>
          MyWebLink
        </Navbar.Brand>
        <Nav className="ms-auto">
          {isAuthenticated && (
            <Nav.Link
              onClick={logoutHandler}
              style={{ color: "white" }}
              onMouseEnter={() => setLogoutText("Logout")}
              onMouseLeave={() => setLogoutText("")}
            >
              <AiOutlineLogout />
              {logoutText}
            </Nav.Link>
          )}
        </Nav>
      </Navbar>
    </Container>
  );
};

export default NavigationBar;
