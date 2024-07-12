import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Services.css';

const Services = () => {
    return (
        <Container className="services-section my-5">
            <Row>
                <Col md={6}>
                    <h2>I nostri Servizi</h2>
                    <p>
                        Re-Cloth offre servizi di riparazione e manutenzione per tutti i tipi di abbigliamento.
                        I nostri esperti riparatori sono in grado di gestire una vasta gamma di interventi,
                        dalla semplice cucitura alla completa ristrutturazione di capi d'abbigliamento.
                    </p>
                </Col>
                <Col md={6}>
                    {/* Placeholder per le immagini */}
                    <div className="image-placeholder">
                        <img src="https://picsum.photos/500/300" alt="Abbigliamento riparato"/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Services;