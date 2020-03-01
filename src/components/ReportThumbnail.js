import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FlagIcon from "@material-ui/icons/Flag";
import IconButton from "@material-ui/core/IconButton";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        size="small"
        onClick={handleClick}
      >
        <FlagIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Contenido ofensivo</MenuItem>
        <MenuItem onClick={handleClose}>Tema repetido </MenuItem>
        <MenuItem onClick={handleClose}>Irrelevante</MenuItem>
      </Menu>
    </div>
  );
}
