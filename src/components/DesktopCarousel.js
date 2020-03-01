import React from "react";
import { red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "../styles/card.css";

import Carousel from "./Carousel";

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

class DesktopCarousel extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h4" component="h4" style={{ margin: "0 0 40px" }}>
          Añadidos recientemente
        </Typography>
        <Carousel
          topics={this.props.topics}
          favorite={this.props.favorite}
          user={this.props.user}
        />
        <Typography
          variant="h4"
          component="h4"
          style={{ margin: "80px 0 40px" }}
        >
          Tendencia
        </Typography>
        <Carousel
          topics={this.props.topics}
          favorite={this.props.favorite}
          user={this.props.user}
        />
        <Typography
          variant="h4"
          component="h4"
          style={{ margin: "80px 0 40px" }}
        >
          Populares
        </Typography>
        <Carousel
          topics={this.props.topics}
          favorite={this.props.favorite}
          user={this.props.user}
        />
        <Typography
          variant="h4"
          component="h4"
          style={{ margin: "80px 0 40px" }}
        >
          Categorias
        </Typography>
        <Carousel
          topics={this.props.topics}
          favorite={this.props.favorite}
          user={this.props.user}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DesktopCarousel);
