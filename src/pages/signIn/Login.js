import React, { useState, useContext } from "react";
import { history } from "../../utils/customHistory";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../context/UserContext";
import { NotificationContext } from "../../context/notification/NotificationContext";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: "85%",
    padding: "1rem",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formItem: {
    width: "100%",
    margin: "0 auto 1.5rem",
  },
  buttonWrapper: {
    marginRight: "0.75rem",
    marginTop: "-2.5rem",
  },
  button: {
    marginLeft: "auto",
  },
});

const Login = () => {
  const classes = useStyles();

  const { logUserIn } = useContext(UserContext);
  const { setNotificationMessage, clearNotificationMessage } =
    useContext(NotificationContext);

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ username: "", password: "" });

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (userData.username && userData.password) {
      clearNotificationMessage();
      const res = await logUserIn(userData);

      setLoading(false);

      if (res && !res.error) history.push("/");
      if (res && res.error) setNotificationMessage(res.error, "error", true);
    } else {
      setNotificationMessage("Please fill in all fields", "error", true);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3.5rem",
      }}
    >
      <Card className={classes.root} raised>
        <CardContent>
          <Typography variant="h6" component="h2">
            Log in
          </Typography>
          <Typography variant="p" gutterBottom>
            New user? Click sign up above
          </Typography>
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <FormControl className={classes.formItem}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    username: e.target.value.trim().toLowerCase(),
                  })
                }
                required
              />
            </FormControl>
            <FormControl className={classes.formItem}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value.trim() })
                }
                required
              />
            </FormControl>
          </form>
        </CardContent>
        <CardActions className={classes.buttonWrapper}>
          <Button
            onClick={handleSubmit}
            type="submit"
            className={classes.button}
            color="secondary"
            variant="contained"
            disableElevation
          >
            {loading ? (
              <CircularProgress color="#fff" size={"1.55rem"} thickness={6} />
            ) : (
              "Submit"
            )}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Login;
