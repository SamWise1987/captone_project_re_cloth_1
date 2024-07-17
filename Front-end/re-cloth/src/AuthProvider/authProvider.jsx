import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('user-role'));
    const [userName, setUserName] = useState(localStorage.getItem('user-name'));
    const [userId, setUserId] = useState(localStorage.getItem('user-id'));

    useEffect(() => {
        if (authToken) {
            localStorage.setItem('auth-token', authToken);
        } else {
            localStorage.removeItem('auth-token');
        }

        if (userRole) {
            localStorage.setItem('user-role', userRole);
        } else {
            localStorage.removeItem('user-role');
        }

        if (userName) {
            localStorage.setItem('user-name', userName);
        } else {
            localStorage.removeItem('user-name');
        }

        if (userId) {
            localStorage.setItem('user-id', userId);
        } else {
            localStorage.removeItem('user-id');
        }
    }, [authToken, userRole, userName, userId]);

    const logout = () => {
        setAuthToken(null);
        setUserRole(null);
        setUserName(null);
        setUserId(null); // Resetta userId
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-role');
        localStorage.removeItem('user-name');
        localStorage.removeItem('user-id');
    };

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, userRole, setUserRole, userName, setUserName, userId, setUserId, logout }}>
            {children}
        </AuthContext.Provider>
    );
};