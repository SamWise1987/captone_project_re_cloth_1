// src/components/RepairerCard.js
import React, { useState } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ContactModal from '../contactModal/ContactModal';
import './card.css';

const RepairerCard = ({ repairer }) => {
    const [showModal, setShowModal] = useState(false);
    const averageRating = repairer.ratings.length > 0
        ? repairer.ratings.reduce((a, b) => a + b, 0) / repairer.ratings.length
        : 'No ratings';

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Card className="repairer-card special-elite-regular">
                <Card.Body>
                    <Card.Title className="repairer-name">{repairer.name}</Card.Title>
                    <Card.Subtitle className="mb-2 repairer-specialization">{repairer.specialization}</Card.Subtitle>
                    <Card.Text className="repairer-info">
                        Email: {repairer.email}
                        <br />
                        Phone: {repairer.phone}
                        <br />
                        Address: {repairer.address}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Specialization: {repairer.specialization}</ListGroupItem>
                    <ListGroupItem>Average Rating: {averageRating}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button variant="dark" className="contact-button" onClick={handleShowModal}>Contatta</Button>
                </Card.Body>
            </Card>
            <ContactModal show={showModal} handleClose={handleCloseModal} repairer={repairer} />
        </>
    );
};

export default RepairerCard;