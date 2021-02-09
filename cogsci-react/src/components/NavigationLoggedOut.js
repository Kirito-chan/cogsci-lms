import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FaBrain, FaUser, FaUserPlus } from "react-icons/fa";

function NavigationLoggedOut({ location }) {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="md">
      <Nav className="mr-auto">
        <Nav.Link href="/login">
          <FaBrain size={25} />
        </Nav.Link>
      </Nav>

      <Nav activeKey={location.pathname}>
        <Nav.Link href="/login" className="mr-4">
          <FaUser /> Login
        </Nav.Link>
        <Nav.Link href="/register">
          <FaUserPlus size={22} /> Register
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationLoggedOut;
