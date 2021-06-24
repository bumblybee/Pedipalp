import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import EventItem from "./EventItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const EventList = ({ spider, events }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {events &&
        events.map((event) => <EventItem spider={spider} event={event} />)}
    </List>
  );
};

export default EventList;
