import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../AuthProvider/authProvider';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
//import logo from '../Logo/Logo_Re_cloth.png';
import logo from '../Logo/LRC.png';
import '../App.css';

const CustomNavbar = ({ onRepairClick, onLoginClick, showSection }) => {
    const { authToken, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // Utilizza useNavigate per il redirect

    const handleLogoClick = () => {
        showSection('hero'); // Chiama showSection per aggiornare lo stato corrente
        navigate('/'); // Reindirizza alla home page
    };

    return (
        <Navbar expand="lg" className="custom-navbar special-elite-regular">
            <Container>
                <Navbar.Brand onClick={handleLogoClick}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ cursor: 'pointer' }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link onClick={onRepairClick} className="nav-link">
                            Chiedi una riparazione
                        </Nav.Link>
                        <Nav.Link onClick={() => showSection('about')} className="nav-link">
                            Perché Re-Cloth
                        </Nav.Link>
                        <Nav.Link onClick={() => showSection('repairers')} className="nav-link">
                            Conosci i nostri riparatori
                        </Nav.Link>
                        <Nav.Link onClick={() => showSection('services')} className="nav-link">
                            Servizi
                        </Nav.Link>
                    </Nav>
                    <Nav className="ml-auto d-flex align-items-center">
                        <Nav.Link onClick={() => showSection('cart')} className="nav-icon">
                            <i className="fas fa-shopping-cart"></i>
                        </Nav.Link>
                        {authToken ? (
                            <Button variant="minimal" className="ml-2" onClick={logout}>Logout</Button>
                        ) : (
                            <Button variant="minimal" className="ml-2" onClick={onLoginClick}>Login</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;