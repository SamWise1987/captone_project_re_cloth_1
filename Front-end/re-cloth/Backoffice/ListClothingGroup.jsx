import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ClothingList = () => {
    const [clothingItems, setClothingItems] = useState([]);

    useEffect(() => {
        const fetchClothingItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/clothingitems');
                setClothingItems(response.data);
            } catch (error) {
                console.error("Errore nel recupero degli abiti:", error);
            }
        };

        fetchClothingItems();
    }, []);

    const updateRepairStatus = async (id, status) => {
        try {
            const response = await axios.put(`/clothingitems/${id}/repairStatus`, { repairStatus: status });
            setClothingItems(clothingItems.map(item => item._id === id ? response.data : item));
        } catch (error) {
            console.error("Errore nell'aggiornamento dello stato della riparazione:", error);
        }
    };

    return (
        <ListGroup>
            {clothingItems.map((item) => (
                <ListGroup.Item key={item._id} className="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{item.name}</strong> - {item.description}
                    </div>
                    <Form.Control
                        as="select"
                        value={item.repairStatus}
                        onChange={(e) => updateRepairStatus(item._id, e.target.value)}
                        className="w-auto ml-3"
                    >
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="not applicable">Not Applicable</option>
                    </Form.Control>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ClothingList;