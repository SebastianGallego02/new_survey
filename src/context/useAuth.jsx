import { createContext, useState, useEffect, useContext } from "react";
import { is_authenticated, login } from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const nav = useNavigate();


  const get_authenticated = async () => {
    try {
      const success = await is_authenticated();
      setIsAuthenticated(success);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login_user = async (email, password) => {
    const success = await login(email, password);
    if (success) {
      setIsAuthenticated(true);
      nav("/encuesta/bienvenida");
    }
  };

  useEffect(() => {
    get_authenticated();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login_user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
