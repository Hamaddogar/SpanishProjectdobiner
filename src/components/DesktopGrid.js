import React from "react";
import { red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import "../styles/card.css";
import ThumbnailCard from "./ThumbnailCard";
import ThumbnailSkeleton from "./ThumbnailSkeleton";
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

class DesktopGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={1}
        >
          {this.props.loading ? (
            <>
              <Grid item xs={5} sm={4} md={3}>
                <ThumbnailSkeleton />
              </Grid>
              <Grid item xs={5} sm={4} md={3}>
                <ThumbnailSkeleton />
              </Grid>
              <Grid item xs={5} sm={4} md={3}>
                <ThumbnailSkeleton />
              </Grid>
              <Grid item xs={5} sm={4} md={3}>
                <ThumbnailSkeleton />
              </Grid>
              <Grid item xs={5} sm={4} md={3}>
                <ThumbnailSkeleton />
              </Grid>
              <Grid item xs={5} sm={4} md={3}>
                <ThumbnailSkeleton />
              </Grid>
              <Grid item xs={5} sm={4} md={3}>
                <ThumbnailSkeleton />
              </Grid>
              <Grid item xs={5} sm={4} md={3}>
                <ThumbnailSkeleton />
              </Grid>
            </>
          ) : (
            this.props.topics.map((topic, index) => (
              <Grid key={index} item xs={5} sm={4} md={3}>
                <ThumbnailCard
                  topics={this.props.topics}
                  topic={topic}
                  index={index}
                  key={index}
                  favorite={this.props.favorite}
                  deleteTopic={this.props.deleteTopic}
                  user={this.props.user}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(DesktopGrid);
