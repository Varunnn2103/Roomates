import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  // --- 1. ADD NEW LOADING STATE ---
  const [isLoading, setIsLoading] = useState(true); // Start as true

  // This effect runs when the app first loads
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    // --- 2. SET LOADING TO FALSE ---
    // We are done loading, whether we found a token or not
    setIsLoading(false); 
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  const isAuth = !!token; 

  // --- 3. PASS isLoading TO THE PROVIDER ---
  return (
    <AuthContext.Provider value={{ token, isAuth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Create a simple hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};