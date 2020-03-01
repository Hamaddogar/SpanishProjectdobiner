import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MyList from "./MyList";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <MyList />
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer("left", true)}
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  );
}
