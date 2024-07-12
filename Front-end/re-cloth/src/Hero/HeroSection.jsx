import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import './HeroSection.css';

// Importa le immagini
import image1 from './photo/15.jpg';
import image2 from './photo/17.jpg';
import image3 from './photo/16.jpg';

const HeroSection = ({ repairers = [] }) => {
    const images = [image1, image2, image3];

    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Benvenuti in Re-Cloth</h1>
                <p>
                    Offriamo servizi di riparazione e manutenzione per i vostri abiti preferiti.
                </p>
            </div>
            <div className="hero-carousel">
                <Carousel>
                    {images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt={`Slide ${index + 1}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default HeroSection;