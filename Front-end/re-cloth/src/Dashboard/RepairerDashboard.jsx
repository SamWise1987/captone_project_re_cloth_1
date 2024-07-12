import React, { useState, useEffect } from 'react';
import ClothingList from '../Backoffice/ListClothingGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './repairerDash.css';

const RepairerDashboard = () => {
    const [userName, setUserName] = useState('');

    const storedUserName = localStorage.getItem('user-name');

    useEffect(() => {
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, [storedUserName]);

    return (
        <div className="main-content special-elite-regular">
            <h1 className="dashboard-title">Benvenuto, {userName}!</h1>
            <h2 className="dashboard-title">Dashboard Riparatore</h2>
            <div className="clothing-list-container">
                <div className="clothing-list">
                    <ClothingList/>
                </div>
            </div>
        </div>
    );
};

export default RepairerDashboard;