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
  message: {
    marginTop: "8rem",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [loading, spiders] = useCRUD({ api: getSpiders });

  if (loading)
    return (
      <div className={classes.root}>
        <Skeleton variant="rect" width={310} height={240} />
        <br />
        <Skeleton variant="rect" width={310} height={240} />
        <br />
        <Skeleton variant="rect" width={310} height={240} />
      </div>
    );

  return (
    <div className={classes.root}>
      {spiders && spiders.length ? (
        spiders.map((spider) => <HomeCard key={spider.id} spider={spider} />)
      ) : (
        <h3 className={classes.message}>Go add some spiders!</h3>
      )}
    </div>
  );
};

export default Home;
