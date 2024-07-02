import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
    const [role, setRole] = useState('user'); // 'user' o 'repairer'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const endpoint = role === 'user' ? '/user/login' : '/repairers/login';
            const response = await axios.post(endpoint, { username, password });
            const { token } = response.data;
            localStorage.setItem('auth-token', token);
            // Reindirizza l'utente alla pagina principale o ad una pagina protetta
            window.location.href = '/dashboard'; //come faccio a far atterrare il riparatore nella listgroup delle lavorazioni che sta seguenedo?
        } catch (error) {
            setErrorMessage('Login fallito. Controlla le tue credenziali.');
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <Dropdown onSelect={(eventKey) => setRole(eventKey)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {role === 'user' ? 'Accedi come Utente' : 'Accedi come Riparatore'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="user">Utente</Dropdown.Item>
                    <Dropdown.Item eventKey="repairer">Riparatore</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Inserisci username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Button variant="primary" type="submit">
                Accedi
            </Button>
        </Form>
    );
};

export default LoginForm;