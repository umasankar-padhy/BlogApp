import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {

  const [auth, setAuth] = useState({});

 
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth(parseData );
    }
    //eslint-disable-next-line
  }, []);
  const value={ auth,setAuth}
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
