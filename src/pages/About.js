import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import S3 from "react-aws-s3";
import { s3Config } from "../config/s3Config";
import { makeStyles } from "@material-ui/core/styles";
import AboutSection from "../components/about/AboutSection";
import { getSpider, deleteSpider } from "../api/spiderApi";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import CardComponent from "../components/cards/CardComponent";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#fff",
    background: red["A400"],
    "&:not(svg)": { boxShadow: "0 0 1px rgba(0,0,0,0.1)" },
  },
}));

const About = () => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [spider, setSpider] = useState([]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${spider.name}?`)) {
      if (spider.image) await deletePrevImage();

      const deleted = await deleteSpider(id);
      console.log(deleted);
      deleted && history.push("/");
    }
  };

  const deletePrevImage = () => {
    const ReactS3Client = new S3(s3Config);

    const storedImageSegments = spider.image.split("/");
    const imageToDelete = storedImageSegments[storedImageSegments.length - 1];

    ReactS3Client.deleteFile(imageToDelete)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const fetchSpider = async () => {
    const res = await getSpider(id);
    console.log(res);
    setSpider(res.data);
  };

  useEffect(() => {
    fetchSpider();
  }, []);

  const headerButton = (
    <Chip
      className={classes.button}
      icon={<DeleteIcon className={classes.button} />}
      label="Delete"
      size="small"
      onClick={handleDelete}
    />
  );

  return (
    <CardComponent
      spider={spider}
      headerButton={headerButton}
      body={<AboutSection spider={spider} />}
    />
  );
};

export default About;
