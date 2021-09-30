import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

let logoutTimer;

export const useAuth = () => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [socket, setSocket] = useState(null);

  const login = useCallback((uid, token, username, expirationDate) => {
    setUserToken(token);
    setUserId(uid);
    setUsername(username);

    const soc = io.connect('http://localhost:5000');
    setSocket(soc);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        username: username,
        expiration: tokenExpirationDate.toISOString(),
        isLoggedIn: !!token,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    setUsername(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (userToken && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [userToken, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.username,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { login, logout, userToken, userId, username, socket };
};
