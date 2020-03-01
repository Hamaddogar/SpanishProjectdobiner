import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PhoneThumbnail from "./PhoneThumbnail";
import PhoneThumbnailSkeleton from "./PhoneThumbnailSkeleton";

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

class PhoneGrid extends React.Component {
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
          {this.props.loading ? (
            <>
              <Grid item xs={10} sm={6} md={4} style={{ padding: "10px 0" }}>
                <PhoneThumbnailSkeleton />
              </Grid>
            </>
          ) : (
            this.props.topics.map((topic, index) => (
              <Grid
                item
                xs={10}
                sm={6}
                md={4}
                key={index}
                style={{ padding: "10px 0" }}
              >
                <PhoneThumbnail
                  key={index}
                  topic={topic}
                  index={index}
                  favorite={this.props.favorite}
                  user={this.props.user}
                  topics={this.props.topics}
                  deleteTopic={this.props.deleteTopic}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PhoneGrid);
