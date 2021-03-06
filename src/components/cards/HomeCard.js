import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getEvents } from "../../api/eventApi";
import { cyan, purple } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CardComponent from "./CardComponent";
import EventList from "../events/EventList";

const useStyles = makeStyles((theme) => ({
  button: {
    color: purple[500],
    textShadow: "0 1px 1px rgba(0,0,0,0.8)",
  },
}));

const HomeCard = ({ spider }) => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const id = spider.id;
    const res = await getEvents(id);
    console.log(res);
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const headerButton = (
    <Link style={{ textDecoration: "none" }} to={`/create-event/${spider.id}`}>
      <IconButton aria-label="add">
        <AddIcon className={classes.button} />
      </IconButton>
    </Link>
  );

  return (
    <CardComponent
      spider={spider}
      headerButton={headerButton}
      body={<EventList spider={spider} events={events && events.slice(0, 1)} />}
      expandableContent={
        <EventList spider={spider} events={events && events.slice(1)} />
      }
    />
  );
};

export default HomeCard;
