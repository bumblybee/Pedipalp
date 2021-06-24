import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import OpacityIcon from "@material-ui/icons/Opacity";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import SyncIcon from "@material-ui/icons/Sync";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    padding: "0 1rem 1rem",
    borderBottom: "1px solid #bdbdbd55",
  },
  tags: {
    display: "flex",
    justifyContent: "space-between",
    width: "24%",
  },
  molt: {
    color: theme.palette.primary.molt,
  },
  li: {
    width: "100%",
    paddingTop: 0,
  },
  date: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const EventItem = ({ event }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem
        alignItems="flex-start"
        className={`${classes.date} ${classes.li}`}
      >
        <Typography variant="subtitle2" color="textPrimary">
          {event.date}
        </Typography>
        <Typography variant="caption" color="textPrimary">
          3 days ago
        </Typography>
      </ListItem>
      <ListItem className={classes.li}>
        <div className={classes.tags}>
          {event.ate && <FastfoodIcon color="primary" fontSize="small" />}
          {event.drank && <OpacityIcon color="secondary" fontSize="small" />}
          {event.molted && (
            <SyncIcon fontSize="small" className={classes.molt} />
          )}
        </div>
      </ListItem>
      <ListItemText
        className={classes.inline}
        align="left"
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {event.notes}
            </Typography>
          </React.Fragment>
        }
      />
    </>
  );
};

export default EventItem;
