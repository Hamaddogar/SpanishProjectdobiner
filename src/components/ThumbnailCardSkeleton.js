import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Skeleton from "@material-ui/lab/Skeleton";
import Circle from "./Circle";
import Divider from "@material-ui/core/Divider";
import "../styles/card.css";
import TimeAgo from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import ShareMenu from "./ShareMenu";
import EditThumbnail from "./EditThumbnail";

import ReportThumbnail from "./ReportThumbnail";

const formatter = buildFormatter(spanishStrings);

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

class ThumbnailCardSkeleton extends React.Component {
  state = {
    topics: [
      {
        title: "",
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
        <Skeleton className={classes.media} />

        <CardContent style={{ padding: "4px" }}>
          <div className="topicTitleContainer"></div>
          <Circle topic={topic} size={2} />
          <div className="creation">
            <span className="author timeAgo">
              Creado por {topic.user.username + " "}
            </span>
            <small className="date timeAgo">
              <TimeAgo date={topic.created} formatter={formatter} />
            </small>
          </div>
        </CardContent>

        <Divider />

        <CardActions disableSpacing style={{ padding: "0 4px" }}>
          <IconButton
            aria-label="add to favorites"
            size="small"
            onClick={() => favorite(index)}
          >
            <FavoriteIcon
              fontSize="small"
              className={
                user
                  ? topic.favorites.includes(user._id)
                    ? classes.favoriteColor
                    : ""
                  : ""
              }
            />
          </IconButton>

          <ShareMenu topic={topic} />
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

export default withStyles(styles)(ThumbnailCardSkeleton);
