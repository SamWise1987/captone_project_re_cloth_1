import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('user-role'));
    const [userName, setUserName] = useState(localStorage.getItem('user-name')); // Aggiungi userName

    const logout = () => {
        setAuthToken(null);
        setUserRole(null);
        setUserName(null); // Resetta userName
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-role');
        localStorage.removeItem('user-name'); // Rimuovi user-name dal localStorage
    };

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, userRole, setUserRole, userName, setUserName, logout }}>
            {children}
        </AuthContext.Provider>
    );
};