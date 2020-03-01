import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Circle from "./Circle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditThumbnailPhone from "./EditThumbnailPhone";

import ReportThumbnailPhone from "./ReportThumbnailPhone";

import Link from "@material-ui/core/Link";

import ShareMenuPhone from "./ShareMenuPhone";

const styles = theme => {
  return {
    root: {},
    card: {
      display: "flex",
      width: "100%",
      height: "120px"
    },
    details: {
      display: "block",
      flexDirection: "column",
      width: "60%"
    },
    content: {
      padding: "10px",
      height: "40px"
    },
    cover: {
      width: "120px",
      height: "120px",
      float: "right"
    },
    favoriteColor: {
      color: "#FF9E80"
    }
  };
};

class PhoneThumbnail extends React.Component {
  render() {
    const { classes, user, topic, deleteTopic } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <Link
            key={this.props.index}
            href={`/tema/${topic._id}`}
            color="inherit"
            variant="inherit"
            underline="none"
          >
            <CardContent
              className={classes.content}
              style={{ paddingBottom: "10px" }}
            >
              <h1
                className={
                  this.props.topic.title.length < 60
                    ? "topicTitlePhone"
                    : "topicLongTitlePhone"
                }
              >
                {topic.title}
              </h1>
            </CardContent>
          </Link>
          <div className="second" style={{ padding: " 15px 5px 8px" }}>
            <IconButton
              aria-label="add to favorites"
              size="small"
              onClick={() => this.props.favorite(this.props.index)}
            >
              <FavoriteIcon
                fontSize="default"
                className={
                  user
                    ? topic.favorites.includes(user._id)
                      ? classes.favoriteColor
                      : ""
                    : ""
                }
              />
            </IconButton>
            <IconButton
              aria-label="share"
              size="small"
              style={{ margin: "5px 0 " }}
            >
              <ShareMenuPhone fontSize="default" topic={topic} />
            </IconButton>
            <IconButton
              aria-label="share"
              size="small"
              style={{ margin: "5px 0 " }}
            >
              {user && topic.user._id === user._id ? (
                <EditThumbnailPhone
                  topic={topic._id}
                  topics={topic}
                  deleteTopic={deleteTopic}
                />
              ) : (
                <ReportThumbnailPhone />
              )}
            </IconButton>
            <Link
              key={this.props.index}
              href={`/tema/${topic._id}`}
              color="inherit"
              variant="inherit"
              underline="none"
            >
              <Circle topic={topic} />
            </Link>
          </div>
        </div>
        <Link
          key={this.props.index}
          href={`/tema/${topic._id}`}
          color="inherit"
          variant="inherit"
          underline="none"
        >
          <CardMedia
            className={classes.cover}
            image={topic.image}
            title={topic.title}
            style={{ borderLeft: "0.5px solid silver" }}
          />
        </Link>
      </Card>
    );
  }
}

export default withStyles(styles)(PhoneThumbnail);
