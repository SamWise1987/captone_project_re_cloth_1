import React from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const RepairerCard = ({ repairer }) => {
    const averageRating = repairer.ratings.length > 0
        ? repairer.ratings.reduce((a, b) => a + b, 0) / repairer.ratings.length
        : 'No ratings';

    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Body>
                <Card.Title>{repairer.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{repairer.specialization}</Card.Subtitle>
                <Card.Text>
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
                <Button variant="primary">Contact</Button>
            </Card.Body>
        </Card>
    );
};

export default RepairerCard;