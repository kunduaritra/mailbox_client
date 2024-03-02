import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Container style={{ backgroundColor: "#B43B35", color: "white" }} fluid>
      <Navbar style={{ color: "white" }} className="p-3">
        <Navbar.Brand href="/" style={{ color: "white", fontWeight: 700 }}>
          MyWebLink
        </Navbar.Brand>
        <Nav>
          <Nav.Link style={{ color: "white" }} href="/home">
            Home
          </Nav.Link>
          <Nav.Link style={{ color: "white" }} href="/products">
            Products
          </Nav.Link>
          <Nav.Link style={{ color: "white" }} href="/aboutus">
            About Us
          </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default NavigationBar;
