import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navigation.css";
import { FaBrain, FaUser } from "react-icons/fa";

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="md">
      <div> </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#predmety2">
            <FaBrain />
          </Nav.Link>

          <Nav.Link href="#predmety">Cogsci predmety</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link href="#predmet">KV: mozog a myseľ</Nav.Link>
          <Nav.Link href="#domace">Domáce úlohy</Nav.Link>
          <Nav.Link href="#podmienky">Podmienky predmetu</Nav.Link>
          <NavDropdown
            title={
              <span>
                <FaUser /> František Kochjar
              </span>
            }
            id="nav-dropdown"
          >
            <NavDropdown.Item eventKey="4.1">Zmeniť heslo</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
