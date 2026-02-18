import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user if token exists on initial render
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // You might want to create a specific endpoint to validate token and get user details if 'user' isn't stored
          // For now, we'll assume if we have a token we might need to fetch user details or just persis from login
          // Let's try to fetch user details using the /me endpoint if available
           const res = await api.get('/auth/me');
           setUser(res.data.data);
        } catch (err) {
          console.error("Failed to load user", err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (err) {
      console.error("Login Error:", err);
      let errorMessage = 'Login failed';
      
      if (err.response) {
          const data = err.response.data;
          if (Array.isArray(data)) {
              errorMessage = data.map(e => e.message).join('\n');
          } else if (typeof data === 'string') {
              errorMessage = data;
          } else if (data.message) {
              errorMessage = data.message;
          } else if (data.error) {
              errorMessage = data.error;
          } else {
              errorMessage = `Server Error (${err.response.status}): ${JSON.stringify(data)}`;
          }
      } else if (err.request) {
          errorMessage = 'No response from server. Please ensure the backend is running.';
      } else {
          errorMessage = err.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (err) {
      console.error("Registration Error:", err);
      let errorMessage = 'Registration failed';
      
      if (err.response) {
          const data = err.response.data;
          if (Array.isArray(data)) {
              errorMessage = data.map(e => e.message).join('\n');
          } else if (typeof data === 'string') {
              errorMessage = data;
          } else if (data.message) {
              errorMessage = data.message;
          } else if (data.error) {
              errorMessage = data.error;
          } else {
              errorMessage = `Server Error (${err.response.status}): ${JSON.stringify(data)}`;
          }
      } else if (err.request) {
          errorMessage = 'No response from server. Please ensure the backend is running.';
      } else {
          errorMessage = err.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
