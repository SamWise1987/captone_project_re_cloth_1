import React, { useState } from 'react';
import axios from 'axios';
import './signIn.css';

const SignUpForm = ({ setShowSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isProfessional, setIsProfessional] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        const endpoint = isProfessional ? 'http://localhost:3000/repairers' : 'http://localhost:3000/user';

        try {
            const response = await axios.post(endpoint, {
                username,
                password,
                name,
                email,
                address,
                phone
            });
            console.log('User created:', response.data);
            setShowSignUp(false);
        } catch (error) {
            setErrorMessage('Registrazione fallita. Controlla i dati inseriti.');
        }
    };

    return (
        <form className="sign-up-form" onSubmit={handleSignUp}>
            <div className="form-group">
                <label htmlFor="signUpUsername">Username</label>
                <input
                    type="text"
                    id="signUpUsername"
                    placeholder="Inserisci username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="signUpPassword">Password</label>
                <input
                    type="password"
                    id="signUpPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="signUpName">Nome</label>
                <input
                    type="text"
                    id="signUpName"
                    placeholder="Inserisci il tuo nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="signUpEmail">Email</label>
                <input
                    type="email"
                    id="signUpEmail"
                    placeholder="Inserisci la tua email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="signUpAddress">Indirizzo</label>
                <input
                    type="text"
                    id="signUpAddress"
                    placeholder="Inserisci il tuo indirizzo"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="signUpPhone">Telefono</label>
                <input
                    type="text"
                    id="signUpPhone"
                    placeholder="Inserisci il tuo numero di telefono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Sei un professionista della riparazione?</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="isProfessional"
                            value="yes"
                            checked={isProfessional === true}
                            onChange={() => setIsProfessional(true)}
                        />
                        Sì
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="isProfessional"
                            value="no"
                            checked={isProfessional === false}
                            onChange={() => setIsProfessional(false)}
                        />
                        No
                    </label>
                </div>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="btn-submit" type="submit">Registrati</button>
            <p className="back-to-login" onClick={() => setShowSignUp(false)}>Torna al login</p>
        </form>
    );
};

export default SignUpForm;