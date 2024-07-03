import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            <Container>
                <Row>
                    <Col>
                        <p>© 2024 Re-Cloth. Tutti i diritti riservati.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;