import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import crypto from "crypto";
import S3 from "react-aws-s3";
import { s3Config } from "../config/s3Config";
import { editSpider, getSpider } from "../api/spiderApi";
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
});

const EditSpider = () => {
  const ReactS3Client = new S3(s3Config);
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [storedImage, setStoredImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [spiderData, setSpiderData] = useState({
    name: "",
    species: "",
    age: Number,
    about: "",
    image: "",
  });

  const fetchSpider = async () => {
    const res = await getSpider(id);
    if (res && res.data) {
      setSpiderData(res.data);
      setStoredImage(res.data.image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = await handleImageUpload();
    console.log("url", url);
    if (url && storedImage && storedImage !== url) {
      deletePrevImage();
    }

    const data = {
      name: spiderData.name,
      age: spiderData.age,
      species: spiderData.species,
      about: spiderData.about,
      image: url ? url : spiderData.image,
    };

    const res = await editSpider(data, id);
    console.log(res);
    if (res && !res.data) {
      setLoading(false);
    } else {
      setLoading(false);
      history.push("/");
    }
  };

  const deletePrevImage = () => {
    const storedImageSegments = storedImage.split("/");
    const imageToDelete = storedImageSegments[storedImageSegments.length - 1];

    ReactS3Client.deleteFile(imageToDelete)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const handleImageUpload = () => {
    if (newImage) {
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

  useEffect(() => {
    fetchSpider();
  }, []);

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
            Edit {spiderData && spiderData.name}'s Info
          </Typography>
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <FormControl className={classes.formItem}>
              <InputLabel htmlFor="name" shrink>
                Name
              </InputLabel>
              <Input
                id="name"
                value={spiderData.name}
                onChange={(e) =>
                  setSpiderData({ ...spiderData, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl className={classes.formItem}>
              <InputLabel shrink htmlFor="species">
                Species
              </InputLabel>
              <Input
                id="species"
                value={spiderData.species}
                onChange={(e) =>
                  setSpiderData({ ...spiderData, species: e.target.value })
                }
              />
            </FormControl>
            <FormControl className={classes.formItem}>
              <InputLabel shrink htmlFor="standard-adornment-amount">
                Age
              </InputLabel>
              <Input
                value={spiderData.age}
                type="number"
                id="standard-adornment-amount"
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
                placeholder={spiderData.image}
                onChange={handleNewImage}
              />
              {spiderData && spiderData.image && (
                <Avatar
                  src={
                    newImage ? URL.createObjectURL(newImage) : spiderData.image
                  }
                />
              )}
            </FormControl>
            <FormControl className={classes.formItem}>
              <TextField
                label="About"
                multiline
                rows={10}
                variant="outlined"
                value={spiderData.about}
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

export default EditSpider;
