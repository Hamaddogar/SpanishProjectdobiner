import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { lightGreen } from "@material-ui/core/colors";
import "../styles/general.css";

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(lightGreen[700]),
    backgroundColor: lightGreen[500],
    "&:hover": {
      backgroundColor: lightGreen[700]
    },
    lineHeight: 2.5,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 16
  }
}))(Button);

const useStyles = makeStyles(theme => ({
  border: {
    border: "2px solid blue "
  }
}));

export default function CustomizedButtons(props) {
  const classes = useStyles();

  return (
    <ColorButton
      onClick={props.voteYes}
      variant="contained"
      color="primary"
      className={
        props.user
          ? props.topic.yesVotes.includes(props.user._id)
            ? classes.border
            : ""
          : ""
      }
    >
      Si
    </ColorButton>
  );
}
