import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => document.cookie.includes("AuthToken"));

  const login = async (email, password) => {
    try {
      let data = { email, password };

      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setLoggedIn(true);
        return ({
          isSuccessful: true
        })
      }
      else if (response.status === 401) {
        let { field, message } = await response.json();
        return ({ 
          isSuccessful: false,
          field, 
          message 
        })
      } else if (response.status === 400) {
        console.log(await response.text())
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const logout = () => {
    fetch("/api/logout")
    .then(res => {
      if(res.ok) setLoggedIn(false)
    }).catch(error => console.log(error.message))
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);