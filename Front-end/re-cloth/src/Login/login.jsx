import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { AuthContext } from '../AuthProvider/authProvider';
import './Login.css';
import SignUpForm from '../Signin/signIn';

const LoginForm = ({ show, handleClose }) => {
    const { setAuthToken, setUserRole, setUserName, setUserId } = useContext(AuthContext);
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const endpoint = role === 'user' ? 'http://localhost:3000/user/login' : 'http://localhost:3000/repairers/login';
            const response = await axios.post(endpoint, { email, password });

            const { token, userId, name } = response.data;
            setAuthToken(token);
            setUserRole(role);
            setUserName(name);
            setUserId(userId);
            localStorage.setItem('auth-token', token);
            localStorage.setItem('user-id', userId);
            localStorage.setItem('user-role', role);
            localStorage.setItem('user-name', name);

            if (role === 'user') {
                window.location.href = '/dashboard';
            } else {
                window.location.href = '/repairer-tasks';
            }
        } catch (error) {
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
                    <SignUpForm setShowSignUp={setShowSignUp} />
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