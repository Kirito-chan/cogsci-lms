import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaBrain, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../app/currentUserSlice";
import {
  LOGOUT_EVENT,
  URL_BONUSES,
  URL_HOME_STUDENT,
  URL_PRESENTATIONS,
  URL_SUBJECTS,
} from "../constants";
import { useParams } from "react-router";
import {
  loadSubject,
  getCurrentSubjectName,
  clearCurrentSubject,
  getCurrentSubjectId,
} from "../features/student/subjects/subjectsSlice";
import { NavLink } from "react-router-dom";
import NavDivider from "./NavDivider";

function NavigationLoggedIn({ currentUserName }) {
  const dispatch = useDispatch();
  const subjectIdParams = useParams().subjectId;
  const subjectName = useSelector(getCurrentSubjectName);
  const subjectId = useSelector(getCurrentSubjectId);

  useEffect(() => {
    if (subjectIdParams) dispatch(loadSubject(subjectIdParams));
  }, [subjectIdParams]);

  const handleDropdown = (event) => {
    if (event == LOGOUT_EVENT) {
      localStorage.clear();
      dispatch(clearToken());
      window.location.reload();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            to={URL_SUBJECTS}
            onClick={() => dispatch(clearCurrentSubject())}
            className="nav-link"
          >
            <FaBrain size={25} />
          </NavLink>

          <NavLink
            to={URL_SUBJECTS}
            onClick={() => dispatch(clearCurrentSubject())}
            className="nav-link"
          >
            Predmety
          </NavLink>
          <NavDivider />
          <NavLink
            to={"/subject/" + subjectId + URL_HOME_STUDENT}
            className={"nav-link " + (!subjectId ? "d-none" : "")}
          >
            {subjectName || ""}
          </NavLink>
          <NavLink
            to={"/subject/" + subjectId + URL_BONUSES}
            className={"nav-link " + (!subjectId ? "d-none" : "")}
          >
            {subjectId && "Bonusy"}
          </NavLink>
          <NavLink
            to={"/subject/" + subjectId + URL_PRESENTATIONS}
            className={"nav-link " + (!subjectId ? "d-none" : "")}
          >
            {subjectId && "Prezentácie"}
          </NavLink>
          <NavLink
            to="/something"
            className={"nav-link " + (!subjectId ? "d-none" : "")}
          >
            {subjectId && "Podmienky"}
          </NavLink>
        </Nav>
        <Nav>
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
