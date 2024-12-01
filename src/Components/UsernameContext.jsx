import { createContext, useEffect, useState } from 'react';
export const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  useEffect(() => {
    sessionStorage.setItem('username', 'tickle122');
  }, [username]);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};
