import { createContext, useContext, useState } from "react";
import { login as apiLogin } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("bodywhy_token")
  );

  const login = async (email, password) => {
    const response = await apiLogin(email, password);

    localStorage.setItem("bodywhy_token", response.token);
    setToken(response.token);
  };

  const logout = () => {
    localStorage.removeItem("bodywhy_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}