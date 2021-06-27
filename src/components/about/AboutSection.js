import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CreateIcon from "@material-ui/icons/Create";
import BugReportIcon from "@material-ui/icons/BugReport";
import ScheduleIcon from "@material-ui/icons/Schedule";
import NotesIcon from "@material-ui/icons/Notes";
import Divider from "@material-ui/core/Divider";
import { lightBlue, lightGreen, pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "35vh",
  },
  list: {
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
  edit: {
    display: "flex",
    justifyContent: "flex-end",
    "& svg": {
      color: "#bbbccc",
    },
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
    <div className={classes.root}>
      <div className={classes.edit}>
        <Link to={`/edit-spider/${spider.id}`}>
          <CreateIcon className={classes.pencil} fontSize="small" />
        </Link>
      </div>
      <List className={classes.list}>
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
          <ListItemText primary="Age" secondary={`${spider.age} mo`} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <NotesIcon className={classes.about} />
          </ListItemIcon>
          <ListItemText primary="About" secondary={spider.about} />
        </ListItem>
      </List>
    </div>
  );
};

export default AboutSection;
