import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import TimeAgo from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const formatter = buildFormatter(spanishStrings);

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
  return (
    <>
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          <strong>{props.opinion.title} </strong>
          {props.opinion.text}
        </Typography>
        <div>
          <p className="author down opinionCard">
            Publicado por{" "}
            <span>
              {props.user
                ? props.opinion.user === props.user._id ||
                  props.opinion.user._id === props.user._id
                  ? "ti "
                  : props.opinion.user.username + " "
                : props.opinion.user.username + " "}
              <TimeAgo date={props.opinion.created} formatter={formatter} />
            </span>
          </p>
        </div>
      </CardContent>
    </>
  );
}
