import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaBrain, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearToken } from "../app/currentUserSlice";
import { LOGOUT_EVENT } from "../constants";
import { useParams, useLocation } from "react-router";

function NavigationLoggedIn({ currentUserName }) {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const location = useLocation();

  const handleDropdown = (event) => {
    if (event == LOGOUT_EVENT) {
      localStorage.clear();
      dispatch(clearToken());
    }
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/subjects">
            <FaBrain size={25} />
          </Nav.Link>

          <Nav.Link href="/subjects">Predmety</Nav.Link>
        </Nav>

        <Nav activeKey={location.pathname}>
          <Nav.Link href={"/home-student/" + subjectId} disabled={!subjectId}>
            {subjectId || ""}
          </Nav.Link>
          <Nav.Link href="#domace">Bonusové úlohy</Nav.Link>
          <Nav.Link href="#podmienky">Podmienky predmetu</Nav.Link>
          <NavDropdown
            title={
              <span>
                <FaUser /> {currentUserName}
              </span>
            }
            id="nav-dropdown"
            onSelect={handleDropdown}
          >
            <NavDropdown.Item eventKey="changePassword">
              Zmeniť heslo
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="logout">Odhlásiť</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationLoggedIn;
