import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReportOpinion from "./ReportOpinion";
import Divider from "@material-ui/core/Divider";

import EditComment from "./EditComment";

import TimeAgo from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const formatter = buildFormatter(spanishStrings);
  const { opinion, user, comments, deleteProComment } = props;

  return comments.map((comment, index) => (
    <div key={index} style={{ backgroundColor: "#f1f8e9" }}>
      <Divider />
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {comment.text}
        </Typography>
      </CardContent>

      <CardActions style={{ padding: "0 20px" }}>
        <div>
          <span className="author">
            Publicado por <span>{user ? "ti " : opinion.user.username}</span>{" "}
            <TimeAgo date={comment.created} formatter={formatter} />
          </span>
        </div>
        <div aria-label="share" className={classes.left}></div>
        {user ? (
          user._id === comment.user._id || user._id === comment.user ? (
            <EditComment
              deleteComment={deleteProComment}
              commentId={comment._id}
            />
          ) : (
            <ReportOpinion />
          )
        ) : (
          <ReportOpinion />
        )}{" "}
      </CardActions>
      <Divider />
    </div>
  ));
}
