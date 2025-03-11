import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in from localStorage
        const checkAuth = () => {
            const token = localStorage.getItem('blogAuthToken');
            setIsAuthenticated(!!token);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = (password) => {
        // Simple authentication - in a real app, you'd want to use a secure method
        // This is just for demonstration purposes
        if (
            password === process.env.REACT_APP_ADMIN_PASSWORD ||
            password === 'admin123'
        ) {
            localStorage.setItem('blogAuthToken', 'authenticated');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('blogAuthToken');
        setIsAuthenticated(false);
    };

    const value = {
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
