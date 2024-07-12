// src/RequestReparationPage/RepairForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './RepairForm.css';

const RepairForm = () => {
    const [formData, setFormData] = useState({
        itemType: '',
        description: '',
        firstName: '',
        lastName: '',
        material: '',
        condition: '',
        photos: [],
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photos: [...e.target.files] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!formData.itemType || !formData.description || !formData.firstName || !formData.lastName) {
            setErrorMessage('Tutti i campi sono obbligatori.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('type', formData.itemType);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('name', `${formData.firstName} ${formData.lastName}`);
        formDataToSend.append('material', formData.material);
        formDataToSend.append('condition', formData.condition);
        formData.photos.forEach((photo) => {
            formDataToSend.append('photos', photo);
        });

        try {
            const response = await axios.post('http://localhost:3000/clothingitems', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Richiesta inviata con successo!');
            setFormData({
                itemType: '',
                description: '',
                firstName: '',
                lastName: '',
                material: '',
                condition: '',
                photos: [],
            });
            console.log(response.data);
        } catch (error) {
            setErrorMessage('Si è verificato un errore durante l\'invio della richiesta.');
            console.error(error);
        }
    };

    return (
        <form className="repair-form special-elite-regular" onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="form-group">
                <label htmlFor="itemType">Cosa vuoi riparare?</label>
                <input
                    type="text"
                    id="itemType"
                    name="itemType"
                    value={formData.itemType}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Descrivi la riparazione</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
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
            <div className="form-row">
                <div className="form-group col">
                    <label htmlFor="material">Materiale</label>
                    <input
                        type="text"
                        id="material"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="condition">Condizione</label>
                    <input
                        type="text"
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="photos">Foto dell'abito</label>
                <input
                    type="file"
                    id="photos"
                    name="photos"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            <button className="btn-submit" type="submit">Invia Richiesta</button>
        </form>
    );
};

export default RepairForm;