import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import Testing from "./Testing";

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
  const classes = useStyles();

  return (
    <>
      {props.opinion.map((opinion, index) => (
        <Card className={classes.card} key={index}>
          <CardContent style={{ paddingBottom: 0 }}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ whiteSpace: "pre-wrap" }}
            >
              <strong>{opinion.title} </strong>
              {opinion.text}
            </Typography>
            <div>
              <p className="author down opinionCard">
                Publicado por{" "}
                <span>
                  {props.user
                    ? opinion.user === props.user._id ||
                      opinion.user._id === props.user._id
                      ? "ti "
                      : opinion.user.username + " "
                    : opinion.user.username + " "}
                  <TimeAgo date={opinion.created} formatter={formatter} />
                </span>
              </p>
            </div>
          </CardContent>
          <Testing
            opinion={opinion}
            upvote={props.upvote}
            getId={props.getId}
            user={props.user}
            deleteOpinion={props.deleteOpinion}
          />
        </Card>
      ))}
    </>
  );
}
