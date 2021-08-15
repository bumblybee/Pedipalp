import React, { useState } from "react";
import { NotificationContext } from "./NotificationContext";

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const setNotificationMessage = (message, type, timed) => {
    setNotification({ message, type });

    if (timed) {
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  };

  const clearNotificationMessage = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, setNotificationMessage, clearNotificationMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
