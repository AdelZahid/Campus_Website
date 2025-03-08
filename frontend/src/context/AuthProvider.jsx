import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("user") || null;
  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
