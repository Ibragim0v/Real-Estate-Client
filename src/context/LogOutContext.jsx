import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LogOutContext = createContext();

export const LogOutProvider = ({ children }) => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (logout) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      navigate("/");
      window.location.reload(false);
    }
  }, [logout, navigate]);
  return (
    <LogOutContext.Provider value={{ logout, setLogout }}>
      {children}
    </LogOutContext.Provider>
  );
};
