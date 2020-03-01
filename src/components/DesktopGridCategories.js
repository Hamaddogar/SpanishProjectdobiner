import React from "react";
import { red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

import "../styles/card.css";
import PhoneThumbnailCategories from "./PhoneThumbnailCategories";
import Grid from "@material-ui/core/Grid";

const styles = theme => {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    card: {
      maxWidth: 300,
      borderRadius: "10px"
    },
    media: {
      height: 0,
      paddingTop: "66.25%" // 16:9
    },
    left: {
      marginLeft: "auto"
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    }
  };
};

class DesktopGridCategories extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={7}
        >
          {this.props.categories.map((category, index) => (
            <Grid key={index} item xs={10} sm={6} md={4}>
              <PhoneThumbnailCategories
                category={category}
                index={index}
                key={index}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(DesktopGridCategories);
