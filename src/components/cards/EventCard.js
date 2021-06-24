import React from "react";
import CardComponent from "../cards/CardComponent";
import EventList from "../events/EventList";

const EventCard = ({ spider }) => {
  return <CardComponent body={<EventList spider={spider} />} spider={spider} />;
};

export default EventCard;
