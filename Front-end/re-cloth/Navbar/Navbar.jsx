import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src="/path/to/logo.png" // Ricordarmi d sostituire con il percorso del logo
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="repair" smooth={true} duration={500}> // Devo poi inserire gli id "repair", "about" e "repairer" nei componenti corrispondenti all'interno di app.js
                            Repair
                        </Nav.Link>
                        <Nav.Link as={Link} to="about" smooth={true} duration={500}>
                            About
                        </Nav.Link>
                        <Nav.Link as={Link} to="repairer" smooth={true} duration={500}>
                            Repairer
                        </Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">

                        <Nav.Link href="#additional-item1">Item 1</Nav.Link>
                        <Nav.Link href="#additional-item2">Item 2</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;