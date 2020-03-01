import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { deepOrange } from "@material-ui/core/colors";

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    "&:hover": {
      backgroundColor: deepOrange[700]
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
      onClick={props.voteNo}
      variant="contained"
      color="primary"
      className={
        props.user
          ? props.topic.noVotes.includes(props.user._id)
            ? classes.border
            : ""
          : ""
      }
    >
      No
    </ColorButton>
  );
}
