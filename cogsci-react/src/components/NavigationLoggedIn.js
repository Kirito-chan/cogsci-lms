import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaBrain, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../app/currentUserSlice";
import {
  LOGOUT_EVENT,
  URL_ADMIN_SUBJECTS,
  URL_ADMIN_BONUSES,
  URL_BONUSES,
  URL_HOME_STUDENT,
  URL_PRESENTATIONS,
  URL_SUBJECTS,
  URL_TERMS,
  URL_HOME_ADMIN,
  URL_ADMIN_PRESENTATIONS,
  NOT_AUTHORIZED,
  URL_ADMIN_SETTINGS,
  URL_EMAIL,
} from "../constants";
import { useLocation, useParams } from "react-router";
import {
  loadSubject,
  getCurrentSubjectName,
  clearCurrentSubject,
  getCurrentSubjectId,
} from "../features/student/subjects/subjectsSlice";
import { NavLink } from "react-router-dom";
import NavDivider from "./NavDivider";

function NavigationLoggedIn({ currentUserName, isAdmin }) {
  const dispatch = useDispatch();
  const subjectIdParams = useParams().subjectId;
  const subjectName = useSelector(getCurrentSubjectName);
  const subjectId = useSelector(getCurrentSubjectId);
  const inSubjectsPage = [
    URL_SUBJECTS,
    URL_ADMIN_SUBJECTS,
    NOT_AUTHORIZED,
  ].includes(useLocation().pathname);

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
            to={isAdmin ? URL_ADMIN_SUBJECTS : URL_SUBJECTS}
            onClick={() => dispatch(clearCurrentSubject())}
            className="nav-link"
          >
            <FaBrain size={25} />
          </NavLink>

          <NavLink
            to={isAdmin ? URL_ADMIN_SUBJECTS : URL_SUBJECTS}
            onClick={() => dispatch(clearCurrentSubject())}
            className="nav-link"
          >
            Predmety
          </NavLink>
          <NavDivider />
          <NavLink
            // prettier-ignore
            to={"/subject/" + subjectId + (isAdmin ? URL_HOME_ADMIN : URL_HOME_STUDENT) }
            className={"nav-link " + (inSubjectsPage ? "d-none" : "")}
          >
            {(!inSubjectsPage && subjectName) || ""}
          </NavLink>
          <NavLink
            // prettier-ignore
            to={"/subject/" + subjectId + (isAdmin ? URL_ADMIN_BONUSES : URL_BONUSES) }
            className={"nav-link " + (inSubjectsPage ? "d-none" : "")}
          >
            {!inSubjectsPage && "Bonusy"}
          </NavLink>
          <NavLink
            to={
              "/subject/" +
              subjectId +
              (isAdmin ? URL_ADMIN_PRESENTATIONS : URL_PRESENTATIONS)
            }
            className={"nav-link " + (inSubjectsPage ? "d-none" : "")}
          >
            {!inSubjectsPage && "Prezentácie"}
          </NavLink>
          <NavLink
            to={"/subject/" + subjectId + URL_TERMS}
            className={
              "nav-link " + (isAdmin || inSubjectsPage ? "d-none" : "")
            }
          >
            {!isAdmin && !inSubjectsPage && "Podmienky"}
          </NavLink>
          <NavLink
            to={"/subject/" + subjectId + URL_ADMIN_SETTINGS}
            className={"nav-link " + (inSubjectsPage ? "d-none" : "")}
          >
            {isAdmin && !inSubjectsPage && "Nastavenia"}
          </NavLink>
          <NavLink
            to={"/subject/" + subjectId + URL_EMAIL}
            className={"nav-link " + (inSubjectsPage ? "d-none" : "")}
          >
            {isAdmin && !inSubjectsPage && "Email"}
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
