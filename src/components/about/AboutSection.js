import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70vh",
    width: "100%",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  text: {
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginRight: "1rem",
  },
}));

const AboutSection = ({ spider }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <h4 className={classes.title}>Species:</h4> <p>{spider.species}</p>
      </div>
      <div className={classes.text}>
        <h4 className={classes.title}>Age:</h4> <p>{spider.age}</p>
      </div>
      <div className={classes.text}>
        <h4 className={classes.title}>About:</h4> <p>{spider.about}</p>
      </div>
    </div>
  );
};

export default AboutSection;
