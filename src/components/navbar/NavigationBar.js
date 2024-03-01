import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Container>
      <Navbar bg="light" data-bs-theme="light" className="p-3">
        <Navbar.Brand href="/">MyWebLink</Navbar.Brand>
        <Nav>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/aboutus">About Us</Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default NavigationBar;
