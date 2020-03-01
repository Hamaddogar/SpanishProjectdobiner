import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Circle from "./Circle";
import Divider from "@material-ui/core/Divider";
import "../styles/card.css";
import TimeAgo from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import Link from "@material-ui/core/Link";

const formatter = buildFormatter(spanishStrings);

const styles = theme => {
  return {
    card: {
      maxWidth: 300,
      borderRadius: "10px"
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

class Thumbnails extends React.Component {
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
    const { classes, topics, index, favorite, user } = this.props;
    return (
      <Card className={classes.card}>
        <Link
          key={index}
          href={`/tema/${topics._id}`}
          color="inherit"
          variant="inherit"
          underline="none"
          className={classes.title}
        >
          <CardMedia
            className={classes.media}
            title={topics.title}
            image={topics.image}
          />
          <CardContent style={{ paddingBottom: "0px" }}>
            <Typography
              variant="h5"
              color="textPrimary"
              component="h3"
              align="center"
              style={{ fontSize: "100%" }}
            >
              {topics.title}
            </Typography>
            <Circle topic={topics} />
            <span className="author"> Creado por {topics.user.username}</span>
            <small className="date">
              <TimeAgo date={topics.created} formatter={formatter} />
            </small>
          </CardContent>

          <Divider />
        </Link>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            size="small"
            onClick={() => favorite(index)}
          >
            <FavoriteIcon
              fontSize="small"
              className={
                user
                  ? topics.favorites.includes(user._id)
                    ? classes.favoriteColor
                    : ""
                  : ""
              }
            />
          </IconButton>
          <IconButton aria-label="share" size="small">
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton className={classes.left}>
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Thumbnails);
