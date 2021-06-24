import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Signup from "./Signup";
import Login from "./Login";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const SignIn = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderForm = () => {
    switch (value) {
      case 0:
        return <Signup />;
      case 1:
        return <Login />;
      default:
        return "";
    }
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Sign up" />
        <Tab label="Log in" />
      </Tabs>
      {renderForm()}
    </>
  );
};

export default SignIn;
