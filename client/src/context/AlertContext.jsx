import { createContext, useContext, useState, useEffect } from "react";
import { setAlertHandler } from "../utils/alertService";
import GenerateAlert from "../components/Alert/GenerateAlert";

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

  // 🔥 REGISTER GLOBAL HANDLER
  useEffect(() => {
    setAlertHandler(generateAlert);
  }, []);

  return (
    <AlertContext.Provider value={{ generateAlert }}>
      {children}

      <GenerateAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);