// src/components/ContactModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../RequestReparationPage/RepairForm.css';

const ContactModal = ({ show, handleClose, repairer }) => {
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        firstName: '',
        lastName: '',
        email: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!formData.subject || !formData.message || !formData.firstName || !formData.lastName || !formData.email) {
            setErrorMessage('Tutti i campi sono obbligatori.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/contact', {
                ...formData,
                repairerId: repairer._id
            });
            setSuccessMessage('Messaggio inviato con successo!');
            setFormData({
                subject: '',
                message: '',
                firstName: '',
                lastName: '',
                email: '',
            });
            console.log(response.data);
        } catch (error) {
            setErrorMessage('Si è verificato un errore durante l\'invio del messaggio.');
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="special-elite-regular">Contatta {repairer.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="repair-form special-elite-regular" onSubmit={handleSubmit}>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="form-group">
                        <label htmlFor="subject">Oggetto</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Messaggio</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="firstName">Nome</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="lastName">Cognome</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn-submit" type="submit">Invia Messaggio</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} className="special-elite-regular">
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ContactModal;