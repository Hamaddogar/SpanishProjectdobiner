import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReportOpinion from "./ReportOpinion";
import ConCardComments from "./ConCardComments";
import Button from "@material-ui/core/Button";
import EditOpinion from "./EditOpinion";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    backgroundColor: "#dcedc8"
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = e => {
    setExpanded(!expanded);
    props.getId(props.opinion._id);
  };

  const upvoteClick = e => {
    props.upvote(props.opinion._id);
  };

  return (
    <>
      <CardActions style={{ padding: "0 20px" }}>
        <Button
          variant="outlined"
          color={
            props.user
              ? props.opinion.upvoters.includes(props.user._id)
                ? "secondary"
                : "primary"
              : ""
          }
          size="small"
          className={classes.button}
          onClick={upvoteClick}
          style={{ margin: "10px 0 10px" }}
        >
          {props.opinion.upvoters.length === 0
            ? ""
            : props.opinion.upvoters.length}{" "}
          Me gusta
        </Button>

        {props.user ? (
          props.user._id === props.opinion.user._id ||
          props.user._id === props.opinion.user ? (
            <EditOpinion
              deleteOpinion={props.deleteOpinion}
              opinionId={props.opinion._id}
            />
          ) : (
            <ReportOpinion />
          )
        ) : (
          <ReportOpinion />
        )}

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          size="small"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ConCardComments opinion={props.opinion} user={props.user} />
      </Collapse>
    </>
  );
}
