import { useEffect, useState } from 'react';
import UsernameContext from './UsernameContext';

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(() => sessionStorage.getItem('username') || '');

  useEffect(() => {
    if (username) {
      sessionStorage.setItem('username', username);
    }
  }, [username]);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};