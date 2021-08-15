import React from "react";
import { getSpiders } from "../api/spiderApi";
import useCRUD from "../hooks/useCrud";
import HomeCard from "../components/cards/HomeCard";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    height: "100%",
    margin: "5% auto",
    "@media(max-width: 640px)": {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [spiders] = useCRUD({ api: getSpiders });

  return spiders && spiders.length ? (
    <div className={classes.root}>
      {spiders.map((spider) => (
        <HomeCard spider={spider} />
      ))}
    </div>
  ) : (
    <div className={classes.root}>
      <Skeleton variant="rect" width={310} height={240} />
      <br />
      <Skeleton variant="rect" width={310} height={240} />
      <br />
      <Skeleton variant="rect" width={310} height={240} />
    </div>
  );
};

export default Home;
