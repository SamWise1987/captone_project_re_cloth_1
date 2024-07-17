import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClothingList from '../Backoffice/ListClothingGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './repairerDash.css';

const RepairerDashboard = () => {
    const [userName, setUserName] = useState('');
    const [clothingItems, setClothingItems] = useState([]);
    const storedUserName = localStorage.getItem('user-name');

    useEffect(() => {
        if (storedUserName) {
            setUserName(storedUserName);
        }
        fetchClothingItems();
    }, [storedUserName]);

    const fetchClothingItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/clothingitems');
            setClothingItems(response.data);
        } catch (error) {
            console.error("Errore nel recupero degli abiti:", error);
        }
    };

    const updateRepairStatus = async (repairId, status) => {
        try {
            const response = await axios.put(`http://localhost:3000/clothingitems/${repairId}/repairStatus`, { repairStatus: status });
            console.log('Updated Repair Status:', response.data);

        } catch (error) {
            console.error('Error updating repair status:', error);
        }
    };

    return (
        <div className="main-content special-elite-regular">
            <h1 className="dashboard-title">Benvenuto, {userName}!</h1>
            <h2 className="dashboard-title">Dashboard del Riparatore</h2>
            <div className="clothing-list-container">
                <div className="clothing-list">
                    <ClothingList updateRepairStatus={updateRepairStatus} />
                </div>
            </div>
        </div>
    );
};

export default RepairerDashboard;