import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import '../App.css';
import './UserDash.css';

const UserDashboard = () => {
    const [clothingItems, setClothingItems] = useState([]);
    const [userName, setUserName] = useState('');

    // Recupera l'ID dell'utente e il token dal local storage
    const userId = localStorage.getItem('user-id');
    const token = localStorage.getItem('auth-token');
    const storedUserName = localStorage.getItem('user-name');

    useEffect(() => {
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, [storedUserName]);

    const fetchClothingItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/clothingitems/user', {
                headers: { 'auth-token': token },
                params: { userId }
            });
            setClothingItems(response.data);
        } catch (error) {
            console.error("Errore nel recupero degli abiti:", error);
        }
    };

    useEffect(() => {
        fetchClothingItems();
        const interval = setInterval(() => {
            fetchClothingItems();
        }, 60000); // Aggiorna ogni 60 secondi

        return () => clearInterval(interval); // Pulisci l'intervallo quando il componente si smonta
    }, []);

    return (
        <div className="special-elite-regular">
            <h1>Benvenuto, {userName}!</h1>
            <h2>Dashboard Utente</h2>
            <ListGroup className="special-elite-regular">
                {clothingItems.map((item) => (
                    <ListGroup.Item key={item._id} className="special-elite-regular">
                        <div>
                            <strong>{item.name}</strong> - {item.description}
                            <p><em>Stato della riparazione: {item.repairStatus}</em></p>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default UserDashboard;