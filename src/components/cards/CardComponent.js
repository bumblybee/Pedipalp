import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import { lime, cyan } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "90%",
    margin: "0 auto",
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
    borderBottom: `1px solid ${cyan[200]}`,
    color: "#fff",
    background: cyan[200],
    textShadow: "0 1px 1px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: lime["A700"],
    boxShadow: "0 0 2px rgba(0,0,0,0.15)",
  },
  content: {
    paddingBottom: 0,
  },
  expandedContent: {
    paddingTop: 0,
  },

  expandable: {
    padding: "0 0.35rem 0 0",
  },
}));

// TODO: Pass prop for expandable content = rest of list

const CardComponent = ({ spider, headerButton, body, expandableContent }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const { pathname } = useLocation();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} raised>
      <CardHeader
        className={classes.header}
        titleTypographyProps={{ variant: "h6" }}
        avatar={
          <Link
            style={{ textDecoration: "none" }}
            to={
              spider && spider.id && !pathname.includes("about")
                ? `/about/${spider.id}`
                : "/"
            }
          >
            <Avatar
              aria-label="name"
              className={classes.avatar}
              src={spider && spider.image && spider.image}
            >
              {spider && spider.name && spider.name.charAt(0)}
            </Avatar>
          </Link>
        }
        action={headerButton}
        title={spider && spider.name && spider.name}
      />

      <CardContent className={classes.content}>{body}</CardContent>

      {expandableContent && (
        <>
          <CardActions className={classes.expandable}>
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
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            className={classes.expandable}
          >
            <CardContent
              className={`${classes.content} ${classes.expandedContent}`}
            >
              {expandableContent}
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  );
};

export default CardComponent;
