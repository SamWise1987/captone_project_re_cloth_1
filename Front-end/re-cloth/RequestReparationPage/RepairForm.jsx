import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

const RepairForm = () => {
    const [formData, setFormData] = useState({
        itemType: '',
        description: '',
        firstName: '',
        lastName: '',
        material: '',
        condition: '',
        //userId: '', // Mi serve per capire chi ha fatto la richiesta, ha senso?
        photos: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photos: [...e.target.files] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('type', formData.itemType);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('name', `${formData.firstName} ${formData.lastName}`);
        formDataToSend.append('material', formData.material);
        formDataToSend.append('condition', formData.condition);
        formDataToSend.append('userId', formData.userId);
        formData.photos.forEach((photo) => {
            formDataToSend.append('photos', photo);
        });

        try {
            const response = await axios.post('/clothingitems', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="itemType">
                            <Form.Label>Cosa vuoi riparare?</Form.Label>
                            <Form.Control
                                type="text"
                                name="itemType"
                                value={formData.itemType}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="description">
                            <Form.Label>Descrivi la riparazione</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="firstName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="material">
                            <Form.Label>Materiale</Form.Label>
                            <Form.Control
                                type="text"
                                name="material"
                                value={formData.material}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="condition">
                            <Form.Label>Condizione</Form.Label>
                            <Form.Control
                                type="text"
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="userId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="photos">
                            <Form.Label>Foto dell'abito</Form.Label>
                            <Form.Control
                                type="file"
                                name="photos"
                                multiple
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Invia Richiesta
                </Button>
            </Form>
        </Container>
    );
};

export default RepairForm;