import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { cyan } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CardComponent from "./CardComponent";
import EventList from "../events/EventList";

const useStyles = makeStyles((theme) => ({
  button: {
    color: cyan[700],
  },
}));

const HomeCard = ({ spider }) => {
  const classes = useStyles();

  const headerButton = (
    <Link to={`/create-event/${spider.id}`}>
      <IconButton aria-label="add">
        <AddIcon className={classes.button} />
      </IconButton>
    </Link>
  );

  return (
    <CardComponent
      spider={spider}
      headerButton={headerButton}
      body={<EventList spider={spider} />}
    />
  );
};

export default HomeCard;
