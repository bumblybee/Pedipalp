import React, { useEffect, useState } from "react";
import { getSpiders } from "../api/spiderApi";
import HomeCard from "../components/cards/HomeCard";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

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
        width: "100%",
      }}
    >
      {spiders.map((spider) => (
        <HomeCard spider={spider} />
      ))}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Skeleton variant="rect" width={310} height={240} animation="false" />
      <br />
      <Skeleton variant="rect" width={310} height={240} animation="false" />
      <br />
      <Skeleton variant="rect" width={310} height={240} animation="false" />
    </div>
  );
};

export default Home;
