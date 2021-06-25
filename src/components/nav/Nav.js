import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { lime, purple } from "@material-ui/core/colors";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "4.5rem",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    color: purple[500],
    background: lime["A400"],
  },
}));

const Nav = () => {
  const { pathname } = useLocation();
  const { user, getCurrentUser } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    getCurrentUser();
  }, [pathname]);

  const renderButton = () => {
    if (user) {
      return pathname === "/" ? (
        <Link to="/create-spider" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            + Add Spider
          </Button>
        </Link>
      ) : (
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Back
          </Button>
        </Link>
      );
    } else if (!user && pathname !== "/sign-in") {
      return (
        <Link to="/sign-in" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Sign in
          </Button>
        </Link>
      );
    } else {
      return "";
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar className={classes.toolbar}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Avatar alt="spider" src="/spidercartoon.png" />
          </Link>
          <div>{renderButton()}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
