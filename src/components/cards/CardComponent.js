import React from "react";
import { lime, cyan, red, lightBlue, green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { orange } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "90%",
    marginBottom: "1rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  header: {
    borderBottom: "1px solid #bdbdbddd",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: orange[400],
  },
  content: {
    padding: 0,
  },
  button: {
    color: cyan[700],
  },
}));

// TODO: Pass prop for expandable content = rest of list

const CardComponent = ({ spider, headerButton, body, expandableContent }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} raised>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="name" className={classes.avatar}>
            {spider.name.charAt(0)}
          </Avatar>
        }
        action={
          // Put details link here
          headerButton
        }
        title={spider.name}
      />

      <CardContent className={classes.content}>{body}</CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* Here is where can put all previous records */}
        <CardContent>{expandableContent}</CardContent>
      </Collapse>
    </Card>
  );
};

export default CardComponent;
