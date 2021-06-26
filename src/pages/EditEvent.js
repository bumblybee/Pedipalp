import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { updateEvent, getEvent } from "../api/eventApi";
import { NotificationContext } from "../context/notification/NotificationContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  date: {
    content: "",
    "&::before": {
      content: "attr(placeholder) !important",
      color: "#aaa",
      marginRight: "0.5em",
    },
    "&:focus:before": {
      content: "",
    },
  },
});

const EditEvent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { setNotificationMessage } = useContext(NotificationContext);
  const [spider, setSpider] = useState({});
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    date: "",
    ate: false,
    drank: false,
    molted: false,
    slings: false,
    notes: "",
  });

  const handleChecked = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await updateEvent(eventData, id);

    if (res && !res.error) {
      setLoading(false);
      history.push("/");
    } else {
      setLoading(false);
      setNotificationMessage(res.error, "error", true);
    }
  };

  const fetchEvent = async () => {
    const res = await getEvent(id);

    if (res && res.data) {
      const data = {
        ate: res.data.ate,
        drank: res.data.drank,
        molted: res.data.molted,
        slings: res.data.slings || false,
        notes: res.data.notes,
        date: res.data.date,
      };

      setEventData(data);
      setSpider(res.data.spider);
    }
  };

  useEffect(() => {
    fetchEvent();
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
        <CardHeader
          className={classes.header}
          titleTypographyProps={{ variant: "h6" }}
          title={spider && spider.name && `Edit ${spider.name}'s Event`}
        />
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <FormControl className={classes.formItem}>
              <TextField
                className={classes.date}
                id="date"
                label="Date"
                type="date"
                max={moment().format("YYYY-MM-DD")}
                defaultValue={eventData.date}
                value={eventData.date}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  placeholder: eventData.date,
                }}
                onChange={(e) =>
                  setEventData({ ...eventData, date: e.target.value })
                }
              />
            </FormControl>

            <FormControl className={classes.formItem}>
              <CheckboxComponent
                handleChecked={handleChecked}
                eventData={eventData}
              />
            </FormControl>

            <FormControl className={classes.formItem}>
              <TextField
                multiline
                rows={10}
                variant="outlined"
                value={eventData.notes}
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

export default EditEvent;
