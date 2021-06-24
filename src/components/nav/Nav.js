import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "1.5rem",
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
    color: "#fff",
  },
}));

const Nav = () => {
  const { pathname } = useLocation();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolbar}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Avatar alt="spider" src="/spidercartoon.png" />
          </Link>
          <div>
            {pathname === "/" ? (
              <Link to="/create" style={{ textDecoration: "none" }}>
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
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
