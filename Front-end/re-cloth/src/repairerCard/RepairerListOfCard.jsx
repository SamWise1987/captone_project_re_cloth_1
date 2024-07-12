import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import RepairerCard from './RepairerCard';

const RepairerList = () => {
    const [repairers, setRepairers] = useState([]);

    useEffect(() => {
        const fetchRepairers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/repairers');
                setRepairers(response.data);
            } catch (error) {
                console.error('Error fetching repairers:', error);
            }
        };

        fetchRepairers();
    }, []);

    return (
        <Container>
            <Row>
                {repairers.map(repairer => (
                    <Col key={repairer._id} sm={12} md={6} lg={4}>
                        <RepairerCard repairer={repairer} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default RepairerList;