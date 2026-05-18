import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vElo_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Action: Handle User Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('vElo_user', JSON.stringify(userData));
  };

  // Action: Handle User Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('vElo_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}