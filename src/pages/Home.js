import React, { useEffect, useState } from "react";
import { getSpiders } from "../api/spiderApi";
import EventCard from "../components/cards/EventCard";
import EventList from "../components/events/EventList";

const Home = () => {
  const [spiders, setSpiders] = useState([]);

  const fetchSpiders = async () => {
    const res = await getSpiders();
    console.log(res);
    setSpiders(res && res.data);
  };

  useEffect(() => {
    fetchSpiders();
  }, []);

  return spiders && spiders.length ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {spiders.map((spider) => (
        <EventCard spider={spider} />
      ))}
    </div>
  ) : (
    <h4>No spiders to show</h4>
  );
};

export default Home;
