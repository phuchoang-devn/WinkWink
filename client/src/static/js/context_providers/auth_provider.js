import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const UserContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => document.cookie.includes("AuthToken"));
  const [user, setUser] = useState(() => {
    if (!document.cookie.includes("AuthToken")) return undefined

    // TODO: replace this by fetch GET user
    const localUser = localStorage.getItem("winkwinkUser")

    if (localUser) return JSON.parse(localUser)

    return undefined
  });

  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
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
        const resUser = await response.json();
        localStorage.setItem("winkwinkUser", JSON.stringify(resUser))
        setUser(resUser);
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
  }, [setLoggedIn, setUser]);

  const logout = () => {
    fetch("/api/logout")
      .then(res => {
        if (res.ok) {
          localStorage.removeItem("winkwinkUser");
          setLoggedIn(false)
          navigate("/")
        }
      }).catch(error => console.log(error.message))
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useUser = () => useContext(UserContext);