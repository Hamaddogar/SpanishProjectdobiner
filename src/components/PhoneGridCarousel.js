import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PhoneCarousel from "./PhoneCarousel";
import Typography from "@material-ui/core/Typography";

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
          {this.props.topics.map((topic, index) => (
            <Grid
              item
              xs={10}
              sm={6}
              md={4}
              key={index}
              style={{ padding: "10px 0" }}
            >
              <Typography
                variant="h4"
                component="h4"
                style={{ margin: "0 0 40px" }}
              >
                Añadidos recientemente
              </Typography>
              <PhoneCarousel
                topics={this.props.topics}
                favorite={this.props.favorite}
                user={this.props.user}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PhoneGrid);
