import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PhoneThumbnailCategories from "./PhoneThumbnailCategories";

const styles = theme => {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  };
};

class PhoneGridCategories extends React.Component {
  render() {
    const { classes, categories } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={7}
        >
          {categories.map((category, index) => (
            <Grid
              item
              xs={10}
              sm={6}
              md={4}
              style={{ padding: "10px 0" }}
              key={index}
            >
              <PhoneThumbnailCategories category={category} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PhoneGridCategories);
