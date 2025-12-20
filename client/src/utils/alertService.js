let alertHandler = null;

export const setAlertHandler = (handler) => {
  alertHandler = handler;
};

export const generateAlert = (message, severity = "success") => {
  if (alertHandler) {
    alertHandler(message, severity);
  } else {
    console.warn("Alert handler not set");
  }
};
