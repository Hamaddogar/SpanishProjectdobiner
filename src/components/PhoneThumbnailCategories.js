import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@material-ui/core/Link";
import CardActionArea from "@material-ui/core/CardActionArea";

const styles = theme => {
  return {
    root: {},
    card: {
      display: "flex",
      width: "100%",
      height: "120px",
      position: "relative"
    },

    content: {
      position: "relative",
      top: "8px",
      left: "16px"
    },

    media: {
      width: "100%",
      height: "120px",
      position: "relative",
      opacity: "0.4"
    }
  };
};

class PhoneThumbnailCategories extends React.Component {
  render() {
    const { classes, category } = this.props;

    return (
      <Link
        key={this.props.index}
        href={`/categoria/${category._id}`}
        color="inherit"
        variant="inherit"
        underline="none"
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={category.image}
              title={category.label}
            />

            <h1 style={{ position: "absolute", top: "8px", left: "16px" }}>
              {category.label}
            </h1>
          </CardActionArea>
        </Card>
      </Link>
    );
  }
}

export default withStyles(styles)(PhoneThumbnailCategories);
