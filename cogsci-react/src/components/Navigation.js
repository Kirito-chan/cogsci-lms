import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './Navigation.css'


export default function Navigation() {

    return (
        <Navbar bg="dark" variant="dark" fixed="top" expand="md">
            <div> </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#predmet">KV: mozog a myseľ</Nav.Link>
                    <Nav.Link href="#domace">Domáce úlohy</Nav.Link>
                    <Nav.Link href="#podmienky">Podmienky predmetu</Nav.Link>
                    <Nav.Link href="#predmety">| Predmety</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}