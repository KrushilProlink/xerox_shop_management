import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" &&
      !!localStorage.getItem("token")
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Sync state → localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [isLoggedIn, user]);

  // 🔥 Sync localStorage → state
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(
        localStorage.getItem("isLoggedIn") === "true" &&
          !!localStorage.getItem("token")
      );

      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (userDetails) => {
    setIsLoggedIn(true);
    setUser(userDetails);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
