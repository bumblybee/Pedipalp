import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BugReportIcon from "@material-ui/icons/BugReport";
import ScheduleIcon from "@material-ui/icons/Schedule";
import NotesIcon from "@material-ui/icons/Notes";
import Divider from "@material-ui/core/Divider";
import {
  lime,
  cyan,
  lightBlue,
  lightGreen,
  pink,
  red,
} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "35vh",
    width: "95%",
  },
  text: {
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginRight: "1rem",
  },
  bug: {
    color: lightGreen["A700"],
  },
  clock: {
    color: lightBlue["A700"],
  },
  about: {
    color: pink["A700"],
  },
}));

const AboutSection = ({ spider }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <BugReportIcon className={classes.bug} />
        </ListItemIcon>
        <ListItemText primary="Species" secondary={spider.species} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemIcon>
          <ScheduleIcon className={classes.clock} />
        </ListItemIcon>
        <ListItemText primary="Age" secondary={spider.age} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemIcon>
          <NotesIcon className={classes.about} />
        </ListItemIcon>
        <ListItemText primary="About" secondary={spider.about} />
      </ListItem>
    </List>
  );
};

export default AboutSection;
