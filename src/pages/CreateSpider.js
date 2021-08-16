import React, { useState } from "react";
import { Link } from "react-router-dom";
import { history } from "../utils/customHistory";
import crypto from "crypto";
import S3 from "react-aws-s3";
import { s3Config } from "../config/s3Config";
import { createSpider } from "../api/spiderApi";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: "85%",
    padding: "1rem",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formItem: {
    width: "100%",
    margin: "0 auto 1.5rem",
  },
  buttonWrapper: {
    marginRight: "0.75rem",
    marginTop: "-2.5rem",
  },
  button: {
    marginLeft: "auto",
  },
  imageIcon: {
    marginTop: "0.25rem",
    width: "44px",
    height: "44px",
  },
});

const CreateSpider = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState();

  const [spiderData, setSpiderData] = useState({
    name: "",
    species: "",
    age: Number,
    about: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (spiderData.name) {
      const url = await handleImageUpload();

      const data = {
        name: spiderData.name,
        age: spiderData.age,
        species: spiderData.species,
        about: spiderData.about,
        image: url ? url : spiderData.image,
      };

      const res = await createSpider(data);

      if (res && !res.data) {
        setLoading(false);
      } else {
        setLoading(false);
        history.push("/");
      }
    }
  };

  const handleImageUpload = () => {
    const ReactS3Client = new S3(s3Config);

    if (newImage && newImage.name) {
      const randomId = crypto.randomBytes(2).toString("hex");
      const imageName = newImage.name.split(".")[0] + "_" + randomId;

      return ReactS3Client.uploadFile(newImage, imageName)
        .then((data) => data.location)
        .catch((err) => console.error(err));
    } else {
      return null;
    }
  };

  const handleNewImage = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3.5rem",
      }}
    >
      <Card className={classes.root} raised>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Add New Spider
          </Typography>
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <FormControl className={classes.formItem}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                onChange={(e) =>
                  setSpiderData({ ...spiderData, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl className={classes.formItem}>
              <InputLabel htmlFor="species">Species</InputLabel>
              <Input
                id="species"
                onChange={(e) =>
                  setSpiderData({ ...spiderData, species: e.target.value })
                }
              />
            </FormControl>
            <FormControl className={classes.formItem}>
              <InputLabel htmlFor="standard-adornment-amount">Age</InputLabel>
              <Input
                type="number"
                id="mo"
                endAdornment={
                  <InputAdornment position="end">mo</InputAdornment>
                }
                onChange={(e) =>
                  setSpiderData({ ...spiderData, age: e.target.value })
                }
              />
            </FormControl>
            <FormControl className={classes.formItem}>
              <InputLabel htmlFor="photo" shrink>
                Photo
              </InputLabel>
              <Input
                id="photo"
                type="file"
                disableUnderline
                onChange={handleNewImage}
              />
              <Avatar
                className={classes.imageIcon}
                src={
                  newImage ? URL.createObjectURL(newImage) : spiderData.image
                }
              >
                {!newImage && !spiderData.image && <InsertPhotoIcon />}
              </Avatar>
            </FormControl>
            <FormControl className={classes.formItem}>
              <TextField
                label="About..."
                multiline
                rows={10}
                variant="outlined"
                onChange={(e) =>
                  setSpiderData({ ...spiderData, about: e.target.value })
                }
              />
            </FormControl>
          </form>
        </CardContent>
        <CardActions className={classes.buttonWrapper}>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className={classes.button}
          >
            <Button
              type="button"
              className={classes.button}
              color=""
              variant="contained"
              disableElevation
            >
              Cancel
            </Button>
          </Link>
          <Button
            onClick={handleSubmit}
            type="submit"
            className={classes.button}
            color="secondary"
            variant="contained"
            disableElevation
          >
            {loading ? (
              <CircularProgress color="#fff" size={"1.55rem"} thickness={6} />
            ) : (
              "Save"
            )}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CreateSpider;
