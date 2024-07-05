import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
var _ = require('lodash');

const AuthContext = createContext(null);
const UserContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => document.cookie.includes("AuthToken"));
  const [user, setUser] = useState(() => {
    if (!document.cookie.includes("AuthToken")) return undefined

    const localUser = localStorage.getItem("winkwinkUser")

    if (localUser) return JSON.parse(localUser)

    return undefined
  });
  const [serverAddr, setServerAddr] = useState(() => {
    if (!document.cookie.includes("AuthToken")) return undefined

    const ipAddr = localStorage.getItem("winkwinkServer")

    if (ipAddr) return JSON.parse(ipAddr)

    return undefined
  });

  useEffect(() => {
    if (!serverAddr) return

    localStorage.setItem("winkwinkServer", JSON.stringify(serverAddr))
  }, [serverAddr])

  useEffect(() => {
    if (!user) return

    localStorage.setItem("winkwinkUser", JSON.stringify(_.omit(user, ['image'])))
  }, [user])

  useEffect(() => {
    if (!isLoggedIn) return

    fetch(`/api/user`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 400) {
          throw new Error("Profile wasn't created.")
        } else throw new Error("Failed to fetch user info")
      })
      .then(json => {
        const { uInfo, ipAddr } = json

        if (ipAddr !== serverAddr)
          setServerAddr(ipAddr)

        if (!_.isEqual(_.omit(user, ['image']), uInfo))
          setUser(state => ({
            ...state,
            ...json
          }))
      })
      .catch(err => console.log(err.message))
  }, [])

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
        const { uInfo, ipAddr } = await response.json();

        setServerAddr(ipAddr);
        setUser(uInfo);
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
      } else throw Error("Server Error")
    } catch (error) {
      console.log(error.message)
      return ({
        isSuccessful: false,
        message: error.message
      })
    }
  }, [setLoggedIn, setUser]);

  const logout = () => {
    fetch("/api/logout")
      .then(res => {
        if (res.ok) {
          localStorage.removeItem("winkwinkUser");
          localStorage.removeItem("winkwinkServer");
          setLoggedIn(false)
          navigate("/")
        }
      }).catch(error => console.log(error.message))
  };

  return (
    <AuthContext.Provider value={{ serverAddr, setServerAddr, isLoggedIn, login, logout }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useUser = () => useContext(UserContext);