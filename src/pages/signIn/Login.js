import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ username: "", password: "" });

  const handleSubmit = () => {};

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
          <Typography variant="h6" component="h2" gutterBottom>
            Log in
          </Typography>
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <FormControl className={classes.formItem}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" />
            </FormControl>
            <FormControl className={classes.formItem}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" />
            </FormControl>
          </form>
        </CardContent>
        <CardActions className={classes.buttonWrapper}>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className={classes.button}
          >
            <Button
              type="button"
              className={classes.button}
              color=""
              disableElevation
            >
              Cancel
            </Button>
          </Link>
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
              "Save"
            )}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Login;
