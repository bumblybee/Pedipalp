import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createEvent } from "../api/eventApi";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CheckboxComponent from "../components/checkbox/CheckboxComponent";

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

const CreateEvent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    date: "",
    ate: false,
    drank: false,
    molted: false,
    notes: "",
  });

  const handleChecked = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log(eventData);
    const res = await createEvent({ ...eventData, spiderId: id });
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
            Add New Event
          </Typography>
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <FormControl className={classes.formItem}>
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  setEventData({ ...eventData, date: e.target.value })
                }
              />
            </FormControl>
            <FormControl className={classes.formItem}>
              <CheckboxComponent handleChecked={handleChecked} />
            </FormControl>

            <FormControl className={classes.formItem}>
              <TextField
                label="Notes..."
                multiline
                rows={10}
                variant="outlined"
                onChange={(e) =>
                  setEventData({ ...eventData, notes: e.target.value })
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

export default CreateEvent;
