import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Skeleton from "react-loading-skeleton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditThumbnailPhone from "./EditThumbnailPhone";
import ShareIcon from "@material-ui/icons/Share";
import ReportThumbnailPhone from "./ReportThumbnailPhone";
import CircleSkeleton from "./CircleSkeleton";
import Link from "@material-ui/core/Link";

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

class PhoneThumbnailSkeleton extends React.Component {
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
    const { classes, user, topic, deleteTopic } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <Link href={""} color="inherit" variant="inherit" underline="none">
            <CardContent
              className={classes.content}
              style={{ paddingBottom: "10px" }}
            >
              <h1 className={"topicTitlePhone"}>
                <Skeleton />
              </h1>
            </CardContent>
          </Link>
          <div className="second" style={{ padding: " 15px 5px 8px" }}>
            <IconButton aria-label="add to favorites" size="small">
              <FavoriteIcon fontSize="default" className={""} />
            </IconButton>
            <IconButton
              aria-label="share"
              size="small"
              style={{ margin: "5px 0 " }}
            >
              <ShareIcon fontSize="default" topic={topic} />
            </IconButton>
            <IconButton
              aria-label="share"
              size="small"
              style={{ margin: "5px 0 " }}
            >
              {user && topic.user._id === user._id ? (
                <EditThumbnailPhone topics={topic} deleteTopic={deleteTopic} />
              ) : (
                <ReportThumbnailPhone />
              )}
            </IconButton>
            <Link href={``} color="inherit" variant="inherit" underline="none">
              <CircleSkeleton topic={this.state.topic} size={2} />
            </Link>
          </div>
        </div>
        <Link
          key={this.props.index}
          href={"/"}
          color="inherit"
          variant="inherit"
          underline="none"
        >
          <CardMedia
            className={classes.cover}
            style={{
              borderLeft: "0.5px solid silver",
              backgroundColor: "#d6d6d6"
            }}
          ></CardMedia>
        </Link>
      </Card>
    );
  }
}

export default withStyles(styles)(PhoneThumbnailSkeleton);
