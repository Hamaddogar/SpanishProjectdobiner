import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ShareIcon from "@material-ui/icons/Share";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";

import CircleSkeleton from "./CircleSkeleton";
import Divider from "@material-ui/core/Divider";
import "../styles/card.css";

import Link from "@material-ui/core/Link";

import EditThumbnail from "./EditThumbnail";

import ReportThumbnail from "./ReportThumbnail";

const styles = theme => {
  return {
    card: {
      maxWidth: 250,
      borderRadius: "10px",
      margin: "10px 10px "
    },
    media: {
      height: 0,
      paddingTop: "66.25%",
      borderBottom: "0.5px silver solid" // 16:9
    },
    left: {
      marginLeft: "auto"
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    },
    favoriteColor: {
      color: "#FF9E80"
    }
  };
};

class ThumbnailCard extends React.Component {
  state = {
    topic: [
      {
        title: "",
        image: "",
        side: "",
        percentage: 0,
        user: {
          username: ""
        }
      }
    ]
  };

  render() {
    const {
      classes,
      topic,
      topics,
      index,
      favorite,
      user,
      deleteTopic
    } = this.props;
    return (
      <Card className={classes.card}>
        <Link
          key={index}
          href={""}
          color="inherit"
          variant="inherit"
          underline="none"
          className={classes.title}
        >
          <CardMedia
            className={classes.media}
            title={this.state.topic.title}
            style={{ backgroundColor: "#d6d6d6" }}
          />

          <CardContent style={{ padding: "4px" }}>
            <div className="topicTitleContainer">
              <h1 className={"topicTitle"}> </h1>
            </div>
            <CircleSkeleton topic={this.state.topic} size={2} />
            <div className="creation">
              <span className="author timeAgo"></span>
              <small className="date timeAgo"></small>
            </div>
          </CardContent>

          <Divider />
        </Link>

        <CardActions disableSpacing style={{ padding: "0 4px" }}>
          <IconButton
            aria-label="add to favorites"
            size="small"
            onClick={() => favorite(index)}
          >
            <FavoriteIcon fontSize="small" className={""} />
          </IconButton>

          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            size="small"
            style={{ margin: "5px 0 " }}
          >
            <ShareIcon />
          </IconButton>
          <div className={classes.left}>
            {user && topic.user._id === user._id ? (
              <EditThumbnail
                topic={topic._id}
                topics={topics}
                deleteTopic={deleteTopic}
              />
            ) : (
              <ReportThumbnail />
            )}
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ThumbnailCard);
