import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green, red, lightBlue } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import OpacityIcon from "@material-ui/icons/Opacity";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import SyncIcon from "@material-ui/icons/Sync";

const useStyles = makeStyles((theme) => ({
  molt: {
    color: green[500],
  },
  drank: {
    color: lightBlue[500],
  },
  ate: {
    color: red[400],
  },
}));

const CheckboxComponent = ({ handleChecked }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState({
    ate: false,
    drank: false,
    molted: false,
  });

  const handleChange = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });

    handleChecked(e);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
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
        control={
          <Checkbox
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
        control={
          <Checkbox
            icon={<SyncIcon />}
            checkedIcon={<SyncIcon className={classes.molt} />}
            name="molted"
            checked={checked.molted}
            onChange={handleChange}
          />
        }
        label="Molted"
      />
    </FormGroup>
  );
};

export default CheckboxComponent;
