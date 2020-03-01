import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginRight: "15px"
  }
}));

export default function Chips() {
  const classes = useStyles();

  const handleDelete = () => {
    alert("You clicked the delete icon.");
  };

  const handleClick = () => {
    alert("You clicked the Chip.");
  };

  return (
    <div className={classes.root}>
      <Chip variant="outlined" label="2 Me gustas" clickable color="primary" />
    </div>
  );
}
