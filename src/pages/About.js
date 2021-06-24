import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AboutSection from "../components/about/AboutSection";
import { getSpider } from "../api/spiderApi";
import { cyan, purple } from "@material-ui/core/colors";
import EventList from "../components/events/EventList";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CardComponent from "../components/cards/CardComponent";

const useStyles = makeStyles((theme) => ({
  button: {
    color: purple[500],
    textShadow: "0 1px 1px rgba(0,0,0,0.2)",
  },
}));

const About = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [spider, setSpider] = useState([]);

  const fetchSpider = async () => {
    const res = await getSpider(id);
    console.log(res);
    setSpider(res.data);
  };

  useEffect(() => {
    fetchSpider();
  }, []);

  return (
    <CardComponent spider={spider} body={<AboutSection spider={spider} />} />
  );
};

export default About;
