import React from "react";
import { withStyles } from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles({
  root: {
    height: 15,
    backgroundColor: "deepOrange"
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "lightGreen"
  }
})(LinearProgress);

const styles = theme => {
  return {
    root: {
      flexGrow: 1
    },
    margin: {
      margin: theme.spacing()
    }
  };
};

class ProgressBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <BorderLinearProgress
          className={classes.margin}
          variant="determinate"
          color="secondary"
          value={this.props.percentage ? this.props.percentage : 0}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProgressBar);
