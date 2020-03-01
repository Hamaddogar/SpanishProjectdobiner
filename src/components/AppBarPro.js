import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  color: { backgroundColor: "#66bb6a" }
}));

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper position="static" className={classes.color}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            a favor
          </Typography>
        </Toolbar>
      </Paper>
    </div>
  );
}
