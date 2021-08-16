import React, { useContext } from "react";
import { NotificationContext } from "../../context/notification/NotificationContext";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "-14%",
    left: "50%",
    transform: "translate(-50%)",
    zIndex: "3000",
    width: "max-content",
    maxWidth: "85%",
    textAlign: "center",
    padding: "1rem",
  },
});

const Notification = () => {
  const { notification } = useContext(NotificationContext);
  const classes = useStyles();

  const setNotification = () => {
    switch (notification.type) {
      case "error":
        return <Alert severity="error">{notification.message}</Alert>;
      case "info":
        return <Alert severity="info">{notification.message}</Alert>;
      case "warning":
        <Alert severity="warning">{notification.message}</Alert>;
      case "success":
        return <Alert severity="success">{notification.message}</Alert>;
      default:
        return "";
    }
  };

  if (notification !== null) window.scrollTo(0, 0);

  return (
    notification !== null && (
      <div className={classes.root}>{setNotification()}</div>
    )
  );
};

export default Notification;
