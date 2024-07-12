import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { AuthContext } from '../AuthProvider/authProvider';
import './Login.css';
import SignUpForm from '../Signin/signIn';  // Importa il componente di registrazione
import '../App.css';

const LoginForm = ({ show, handleClose }) => {
    const { setAuthToken, setUserRole, setUserName } = useContext(AuthContext);
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);  // Stato per mostrare il form di registrazione

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const endpoint = role === 'user' ? 'http://localhost:3000/user/login' : 'http://localhost:3000/repairers/login';
            console.log(`Sending POST request to ${endpoint} with email: ${email} and role: ${role}`);  // Log di debug
            const response = await axios.post(endpoint, { email, password });
            console.log('Response:', response);  // Log di debug

            // De-strutturare correttamente l'oggetto response.data
            if (response && response.data) {
                const { token, userId, name } = response.data; // Assumi che l'ID utente sia restituito qui
                setAuthToken(token);
                setUserRole(role);
                setUserName(name);
                localStorage.setItem('auth-token', token);
                localStorage.setItem('user-id', userId); // Salva l'ID utente nel local storage
                localStorage.setItem('user-role', role);
                localStorage.setItem('user-name', name); // Salva il nome dell'utente nel local storage

                if (role === 'user') {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/repairer-tasks';
                }
            } else {
                throw new Error('Login failed: Invalid response from server');
            }
        } catch (error) {
            console.error('Login error:', error.message || error);
            setErrorMessage('Login fallito. Controlla le tue credenziali.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showSignUp ? (
                    <SignUpForm setShowSignUp={setShowSignUp} />  // Mostra il form di registrazione
                ) : (
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="dropdown">
                            <button className="dropdown-toggle" type="button">
                                {role === 'user' ? 'Accedi come Utente' : 'Accedi come Riparatore'}
                            </button>
                            <div className="dropdown-menu">
                                <div className="dropdown-item" onClick={() => setRole('user')}>Utente</div>
                                <div className="dropdown-item" onClick={() => setRole('repairer')}>Riparatore</div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="formBasicEmail">Email</label>
                            <input
                                type="email"
                                id="formBasicEmail"
                                placeholder="Inserisci la tua email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="formBasicPassword">Password</label>
                            <input
                                type="password"
                                id="formBasicPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <button className="btn-submit" type="submit">Accedi</button>

                        <p className="sign-up-link" onClick={() => setShowSignUp(true)}>Non hai un account? Registrati</p>
                    </form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Chiudi</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginForm;