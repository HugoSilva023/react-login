import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  return (
    <DataContext.Provider value={{ user, setUser, error, setError }}>
      { children }
    </DataContext.Provider>
  );
};
