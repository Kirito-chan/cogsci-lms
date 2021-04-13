import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FaBrain, FaUser, FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { URL_REGISTER } from "../constants";

function NavigationLoggedOut() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Nav className="mr-auto">
        <NavLink to={"/login"} className="nav-link mr-4">
          <FaBrain size={25} />
        </NavLink>
      </Nav>

      <Nav>
        <NavLink to={"/login"} className="nav-link mr-4">
          <FaUser /> Login
        </NavLink>
        <NavLink to={URL_REGISTER} className="nav-link">
          <FaUserPlus size={22} /> Registrácia
        </NavLink>
      </Nav>
    </Navbar>
  );
}

export default NavigationLoggedOut;
