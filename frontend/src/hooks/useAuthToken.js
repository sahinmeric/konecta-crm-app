import { useState, useEffect } from 'react';
import { AUTH_TOKEN } from '../constants';

const useAuthToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return token;
};

export default useAuthToken;
