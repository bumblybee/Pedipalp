import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createSpider } from "../api/spiderApi";
import { makeStyles } from "@material-ui/core/styles";
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
import { HighlightSharp } from "@material-ui/icons";

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

const CreateSpider = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [spiderData, setSpiderData] = useState({
    name: "",
    species: "",
    age: Number,
    about: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await createSpider(spiderData);
    console.log(res);
    if (res && !res.data) {
      setLoading(false);
    } else {
      setLoading(false);
      history.push("/");
    }
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
              <Input id="photo" type="file" disableUnderline />
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
