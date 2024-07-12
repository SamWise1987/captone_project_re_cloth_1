import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Collapse } from 'react-bootstrap';
import axios from 'axios';
import './ListClothingGroup.css';
import '../App.css'

const ClothingList = () => {
    const [clothingItems, setClothingItems] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);

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
            console.log(`Updating repair status for item ID: ${id} to ${status}`); // Log per debugging
            const response = await axios.put(`http://localhost:3000/clothingitems/${id}/repairStatus`, { repairStatus: status });
            setClothingItems(clothingItems.map(item => item._id === id ? response.data : item));
        } catch (error) {
            console.error("Errore nell'aggiornamento dello stato della riparazione:", error);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'in progress':
                return 'status-in-progress';
            case 'completed':
                return 'status-completed';
            case 'not applicable':
                return 'status-not-applicable';
            default:
                return '';
        }
    };

    const toggleItemExpansion = (id) => {
        setExpandedItem(expandedItem === id ? null : id);
    };

    return (
        <ListGroup>
            {clothingItems.map((item) => (
                <ListGroup.Item
                    key={item._id}
                    className={`d-flex flex-column ${getStatusClass(item.repairStatus)} special-elite-regular`}
                    onClick={() => toggleItemExpansion(item._id)}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{item.name}</strong> - {item.description}
                            <p><em>Richiesto da: {item.userId ? item.userId.name : "Unknown"}</em></p>
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
                    </div>
                    <Collapse in={expandedItem === item._id}>
                        <div className="mt-3">
                            <p><strong>Tipo:</strong> {item.type}</p>
                            <p><strong>Materiale:</strong> {item.material}</p>
                            <p><strong>Condizione:</strong> {item.condition}</p>
                            <div className="photos">
                                {item.photos && item.photos.map((photo, index) => (
                                    <img key={index} src={photo} alt={`Foto ${index + 1}`} className="item-photo" />
                                ))}
                            </div>
                            <p><strong>Data di registrazione:</strong> {new Date(item.registrationDate).toLocaleDateString()}</p>
                        </div>
                    </Collapse>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ClothingList;