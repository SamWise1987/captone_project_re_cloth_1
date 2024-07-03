import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

const HeroSection = () => {
    return (
        <Jumbotron fluid className="text-center bg-primary text-white">
            <Container>
                <h1>Benvenuti in Re-Cloth</h1>
                <p>
                    Offriamo servizi di riparazione e manutenzione per i vostri abiti preferiti.
                </p>
            </Container>
        </Jumbotron>
    );
};

export default HeroSection;