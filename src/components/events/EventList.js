import React from "react";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import OpacityIcon from "@material-ui/icons/Opacity";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import SyncIcon from "@material-ui/icons/Sync";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    padding: "0 1rem 1rem",
    borderBottom: "1px solid rgba(0,0,0,0.085)",
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
    // boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    width: "100%",
  },
  date: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const EventList = ({ spider }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem
        alignItems="flex-start"
        className={`${classes.date} ${classes.li}`}
      >
        <Typography variant="subtitle2" color="textPrimary">
          06/20/2021
        </Typography>
        <Typography variant="caption" color="textPrimary">
          3 days ago
        </Typography>
      </ListItem>
      <ListItem className={classes.li}>
        <div className={classes.tags}>
          <FastfoodIcon color="primary" fontSize="small" />
          <OpacityIcon color="secondary" fontSize="small" />

          <SyncIcon fontSize="small" className={classes.molt} />
        </div>
      </ListItem>
      <ListItemText
        className={classes.inline}
        align="left"
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              Ate and drank today after molting. Successful molt.
            </Typography>
          </React.Fragment>
        }
      />

      {/* <Divider variant="fullWidth" /> */}
    </List>
  );
};

export default EventList;
