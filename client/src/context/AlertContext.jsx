import { createContext, useContext, useEffect, useState } from "react";
import { setAlertHandler } from "../utils/alertService";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const generateAlert = (message, severity = "success") => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    setAlertHandler(generateAlert);
  }, []);

  return (
    <AlertContext.Provider value={{ generateAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);