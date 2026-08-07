import { createContext, useContext, useState, type ReactNode } from "react";
import { login as apiLogin } from "../api/client";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("bodywhy_token")
  );

  const login = async (email: string, password: string) => {
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