import { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, getMe } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // checking token on mount

  // On app load: if a token exists in localStorage, validate it with the server
  useEffect(() => {
    const token = localStorage.getItem('tcg-token');
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then((res) => setAdmin(res.admin))
      .catch(() => {
        // Token is invalid or expired — clear it
        localStorage.removeItem('tcg-token');
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await loginAdmin(email, password);
    localStorage.setItem('tcg-token', res.token);
    setAdmin(res.admin);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('tcg-token');
    setAdmin(null);
  };

  // Called after a profile update so the UI reflects changes immediately
  const refreshAdmin = (updatedAdmin) => {
    setAdmin(updatedAdmin);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        login,
        logout,
        refreshAdmin,
        loading,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
