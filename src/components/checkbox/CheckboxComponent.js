import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  lightGreen,
  purple,
  lightBlue,
  orange,
} from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import OpacityIcon from "@material-ui/icons/Opacity";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import SyncIcon from "@material-ui/icons/Sync";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";

const useStyles = makeStyles((theme) => ({
  molt: {
    color: lightGreen[500],
  },
  drank: {
    color: lightBlue[400],
  },
  ate: {
    color: orange[500],
  },
  slings: {
    color: purple[300],
  },
  label: {
    marginRight: "0",
    "& span": {
      fontSize: "0.95rem",
    },
  },
}));

const CheckboxComponent = ({ handleChecked, eventData }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState({
    ate: false,
    drank: false,
    molted: false,
    slings: false,
  });

  const handleChange = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });

    handleChecked(e);
  };

  useEffect(() => {
    eventData &&
      setChecked({
        ate: eventData.ate,
        drank: eventData.drank,
        molted: eventData.molted,
        slings: eventData.slings,
      });
  }, [eventData]);

  return (
    <FormGroup row>
      <FormControlLabel
        className={classes.label}
        labelPlacement="bottom"
        control={
          <Checkbox
            size="small"
            icon={<FastfoodIcon />}
            checkedIcon={<FastfoodIcon className={classes.ate} />}
            name="ate"
            checked={checked.ate}
            onChange={handleChange}
          />
        }
        label="Ate"
      />

      <FormControlLabel
        className={classes.label}
        labelPlacement="bottom"
        control={
          <Checkbox
            size="small"
            icon={<OpacityIcon />}
            checkedIcon={<OpacityIcon className={classes.drank} />}
            name="drank"
            checked={checked.drank}
            onChange={handleChange}
          />
        }
        label="Drank"
      />
      <FormControlLabel
        className={classes.label}
        labelPlacement="bottom"
        control={
          <Checkbox
            size="small"
            icon={<SyncIcon />}
            checkedIcon={<SyncIcon className={classes.molt} />}
            name="molted"
            checked={checked.molted}
            onChange={handleChange}
          />
        }
        label="Molted"
      />

      <FormControlLabel
        className={classes.label}
        labelPlacement="bottom"
        control={
          <Checkbox
            size="small"
            icon={<ChildFriendlyIcon />}
            checkedIcon={<ChildFriendlyIcon className={classes.slings} />}
            name="slings"
            checked={checked.slings}
            onChange={handleChange}
          />
        }
        label="Slings"
      />
    </FormGroup>
  );
};

export default CheckboxComponent;
