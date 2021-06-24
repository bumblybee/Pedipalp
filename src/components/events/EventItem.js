import React from "react";
import moment from "moment";
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
    borderBottom: "1px solid rgba(0, 0, 0, 0.075)",
  },
  tags: {
    display: "flex",
    justifyContent: "flex-start",
    width: "24%",
  },
  molt: {
    color: theme.palette.primary.molt,
  },
  li: {
    width: "100%",
    paddingTop: "0.25rem",
  },
  date: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#212121",
  },
  days: {
    color: "#757575",
  },
}));

const EventItem = ({ event }) => {
  const classes = useStyles();

  const countDays = () => {
    const today = moment();
    const date = event.date;

    return today.diff(date, "days");
  };

  const renderDays = () => {
    const days = countDays();
    switch (days) {
      case 0:
        return "today";
      case 1:
        return "1 day ago";
      default:
        return `${days} days ago`;
    }
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        className={`${classes.date} ${classes.li}`}
      >
        <Typography variant="subtitle2" color="textPrimary">
          {moment(event.date).format("MM/DD/YY")}
        </Typography>
        <Typography variant="caption" className={classes.days}>
          {renderDays()}
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
